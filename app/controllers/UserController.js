var jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const moveFile = require('../middlewares/move.file');

function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getOneUserById(_id) {
    const userCurrent = await User.findById(_id).catch(() => null);
    return userCurrent;
}

class UserController {
    //GET /user/getall
    getall(req, res, next) {
        User.find()
            .sort({ updatedAt: 'desc' })
            .select({ password: 0 })
            .then((users) =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Get all users successfully',
                    data: {
                        meta: {
                            current: 0,
                            pageSize: 0,
                            pages: 0,
                            total: 0,
                        },
                        users,
                    },
                }),
            )
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get all user failed',
                    error: 'Get all user failed',
                }),
            );
    }

    //GET /user/?_id=''&username=''
    async getOneUser(req, res, next) {
        // const user = req.user;
        const id = req.query._id;

        console.log('path', req.path);
        console.log('method', req.method);

        User.findById(id)
            .then((user) => {
                const { password, ...payloads } = user._doc;
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Get user successfully',
                    data: {
                        ...payloads,
                    },
                });
            })
            .catch(() =>
                next({
                    statusCode: 404,
                    message: 'Not found user',
                    error: 'Not found user',
                }),
            );
    }

    //GET /user/getUserByFollowing/:_id
    async getUserByFollowing(req, res, next) {
        const userId = req.params._id;

        const userCurrent = await getOneUserById(userId, next);

        if (!userCurrent) {
            return next({
                statusCode: 500,
                message: 'Get user by id failed',
                error: 'Get user by id failed',
            });
        }

        User.find({ _id: { $in: userCurrent.followings } })
            .limit(10)
            .then((response) =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Get user successfully',
                    data: response,
                }),
            )
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get user by following failed',
                    error: 'Get user by following failed',
                }),
            );
    }

    async getUserRandom(req, res, next) {
        const countAllUsers = await User.countDocuments();

        const randomIndex = between(0, countAllUsers <= 7 ? 0 : countAllUsers - 7);

        User.find()
            .skip(randomIndex)
            .sort({ createdAt: 'desc' })
            .limit(7)
            .then((response) =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Get user random successfully',
                    data: response,
                }),
            )
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get user random failed',
                    error: 'Get user random failed',
                }),
            );
    }

    //DELETE /user/:_id
    delete(req, res, next) {
        const user = req.user;
        //...Check admin
        // req.body._id === req.params._id || req.user.isAdmin
        if (true) {
            console.log(req.params._id);
            User.findById(req.params._id)
                .then((response) => {
                    if (!response) {
                        return next({
                            statusCode: 404,
                            message: 'Not found user to delete',
                            error: 'Not found user to delete',
                        });
                    }

                    return res.status(200).json({
                        statusCode: 200,
                        message: 'Delete successfully',
                        data: { deletedCount: 1 },
                    });
                })
                .catch(() =>
                    next({
                        statusCode: 404,
                        message: 'Not found user to delete',
                        error: 'Not found user to delete',
                    }),
                );
        } else {
            return next({
                statusCode: 401,
                message: 'You can delete only your account!',
                error: 'You can delete only your account!',
            });
        }
    }

    //PUT /user
    async update(req, res, next) {
        const user = req.user;

        // const profilePicture = req.body.profilePicture;
        // const coverPicture = req.body.coverPicture;

        let { profilePicture, coverPicture, ...data } = req.body;

        if (profilePicture) {
            data = { ...data, profilePicture };
            await moveFile(profilePicture, req, next);
        }

        if (coverPicture) {
            data = { ...data, coverPicture };
            await moveFile(coverPicture, req, next);
        }

        if (req.body.password) {
            const saltRounds = 10;
            const hassPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hassPassword;
        }

        User.findByIdAndUpdate(user._id, data)
            .then(() =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Update successfully',
                    data: { updatedCount: 1 },
                }),
            )
            .catch(() =>
                next({
                    statusCode: 404,
                    message: 'Not found user',
                    error: 'Not found user',
                }),
            );
    }

    //PUT /user/:_id/follow
    async follow(req, res, next) {
        const userToken = req.user;

        if (userToken._id !== req.params._id) {
            const users = await Promise.all([
                User.findById(req.params._id),
                User.findById(userToken._id),
            ])
                .then((responses) => ({ user: responses[0], userCurrent: responses[1] }))
                .catch({
                    statusCode: 404,
                    message: 'Not found user',
                    error: 'Not found user',
                });
            // userCurrent là người phát request
            const { user, userCurrent } = users;
            //Xét 2 trường hợp đã follow hoặc chưa follow
            if (!userCurrent.followings.includes(user._id)) {
                Promise.all([
                    user.updateOne({
                        $push: { followers: userCurrent._id },
                    }),
                    userCurrent.updateOne({
                        $push: { followings: user._id },
                    }),
                ])
                    .then(() =>
                        res.status(200).json({
                            statusCode: 200,
                            message: 'You follow this user successful',
                            data: { updatedCount: 1 },
                        }),
                    )
                    .catch(() =>
                        next({
                            statusCode: 500,
                            message: 'Follow failed',
                            error: 'Follow failed',
                        }),
                    );
            } else {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'You already follow this user',
                    error: 'You already follow this user',
                });
            }
        } else {
            return next({
                statusCode: 403,
                message: "You can't follow yourself",
                error: "You can't follow yourself",
            });
        }
    }

    //PUT /user/:_id/unfollow
    async unfollow(req, res, next) {
        const userToken = req.user;

        if (userToken._id !== req.params._id) {
            //Get 2 user follow và bị follow và current user là người phát request
            const users = await Promise.all([
                User.findById(req.params._id),
                User.findById(userToken._id),
            ])
                .then((responses) => ({ user: responses[0], userCurrent: responses[1] }))
                .catch({
                    statusCode: 404,
                    message: 'Not found user',
                    error: 'Not found user',
                });
            const { user, userCurrent } = users;
            //Xét 2 trường hợp đã follow hoặc chưa follow
            if (userCurrent.followings.includes(user._id)) {
                const userUpdate = user.updateOne({
                    $pull: { followers: userCurrent._id },
                });
                const userCurrentUpdate = userCurrent.updateOne({
                    $pull: { followings: user._id },
                });
                Promise.all([userUpdate, userCurrentUpdate])
                    .then(() =>
                        res.status(200).json({
                            statusCode: 200,
                            message: 'You unfollow this user successful',
                            data: { updatedCount: 1 },
                        }),
                    )
                    .catch(() =>
                        next({
                            statusCode: 500,
                            message: 'Unfollow failed',
                            error: 'Unfollow failed',
                        }),
                    );
            } else {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'You already unfollow this user',
                    error: 'You already unfollow this user',
                });
            }
        } else {
            return next({
                statusCode: 403,
                message: "You can't unfollow yourself",
                error: "You can't unfollow yourself",
            });
        }
    }
}

module.exports = new UserController();
