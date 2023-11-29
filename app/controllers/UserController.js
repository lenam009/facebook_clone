var jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
    //GET /user
    // index(req, res, next) {
    //     User.find()
    //         .then((users) => res.status(200).json(users))
    //         .catch(() => next('Get all user failed'));
    // }

    //GET /user/?_id=''&username=''
    async getOneUser(req, res, next) {
        const _id = req.query._id;
        const username = req.query.username;

        return _id
            ? await User.findById(_id)
                  .then((user) => {
                      const { password, ...payloads } = user._doc;
                      return res.status(200).json(payloads);
                  })
                  .catch(() => next('Get one user failed'))
            : await User.findOne({ username: username })
                  .then((user) => {
                      const { password, ...payloads } = user._doc;
                      return res.status(200).json(payloads);
                  })
                  .catch(() => next('Get one user failed'));
        // const { password, ...payloads } = data._doc;
        // return res.status(200).json(payloads);
    }

    //DELETE /user/:_id
    delete(req, res, next) {
        //...Check admin
        if (req.body._id === req.params._id || req.body.isAdmin) {
            User.findByIdAndDelete(req.body._id)
                .then((response) => res.status(200).json('Successful delete'))
                .catch(() => next('Delete failed'));
        } else {
            return next('You can delete only your account!');
        }
    }

    //PUT /user/:_id
    async update(req, res, next) {
        if (req.body._id === req.params._id || req.body.isAdmin) {
            if (req.body.password) {
                const saltRounds = 10;
                const hassPassword = await bcrypt.hash(req.body.password, saltRounds);
                req.body.password = hassPassword;
            }
            User.findByIdAndUpdate(req.body._id, req.body)
                .then((response) => res.status(200).json('Successful update user'))
                .catch(() => next('Update user failed'));
        } else {
            return next('You can update only your account!');
        }
    }

    //PUT /user/:_id/follow
    async follow(req, res, next) {
        if (req.body._id !== req.params._id || req.body.isAdmin) {
            //Get 2 user follow và bị follow và current user là người phát request
            const users = await Promise.all([
                User.findById(req.params._id),
                User.findById(req.body._id),
            ])
                .then((responses) => ({ user: responses[0], userCurrent: responses[1] }))
                .catch('Get Users failed');
            const { user, userCurrent } = users;
            //Xét 2 trường hợp đã follow hoặc chưa follow
            if (!userCurrent.followings.includes(user._id)) {
                const userUpdate = user.updateOne({
                    $push: { followers: userCurrent._id },
                });
                const userCurrentUpdate = userCurrent.updateOne({
                    $push: { followings: user._id },
                });
                Promise.all([userUpdate, userCurrentUpdate])
                    .then(() => res.status(200).json('You follow this user successful'))
                    .catch(() => next('Follow failed'));
            } else {
                return res.status(403).json('You already follow this user');
            }
        } else {
            return next('You can not follow yourself');
        }
    }

    //PUT /user/:_id/unfollow
    async unfollow(req, res, next) {
        if (req.body._id !== req.params._id || req.body.isAdmin) {
            //Get 2 user follow và bị follow và current user là người phát request
            const users = await Promise.all([
                User.findById(req.params._id),
                User.findById(req.body._id),
            ])
                .then((responses) => ({ user: responses[0], userCurrent: responses[1] }))
                .catch('Get Users failed');
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
                    .then(() => res.status(200).json('You unfollow this user successful'))
                    .catch(() => next('Unfollow failed'));
            } else {
                return res.status(403).json('You do not follow this user');
            }
        } else {
            return next('You can not unfollow yourself');
        }
    }
}

module.exports = new UserController();
