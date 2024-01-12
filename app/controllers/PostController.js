const Post = require('../models/Post');
const User = require('../models/User');
const moveFile = require('../middlewares/move.file');
const deleteFile = require('../middlewares/delete.file');

async function getOneUserById(_id) {
    const userCurrent = await User.findById(_id).catch(() => null);
    return userCurrent;
}

class PostController {
    //GET /post (Get all posts)
    index(req, res, next) {
        Post.find()
            .sort({ updatedAt: 'desc' })
            .then((posts) =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Get all posts successfully',
                    data: {
                        meta: {
                            current: 0,
                            pageSize: 0,
                            pages: 0,
                            total: 0,
                        },
                        posts,
                    },
                }),
            )
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get all posts failed',
                    error: 'Get all posts failed',
                }),
            );
    }

    //GET /post/:_id
    getOnePost(req, res, next) {
        Post.findById(req.params._id)
            .then((response) =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Get post successfully',
                    data: {
                        ...response._doc,
                    },
                }),
            )
            .catch(() =>
                next({
                    statusCode: 404,
                    message: 'Not found post',
                    error: 'Not found post',
                }),
            );
    }

    //GET(Chỉ nhận bài post của các user mà mình đã theo dõi và của chính mình)
    //                                                  /post/timeline/:userId
    async getPostByFollowing(req, res, next) {
        const user = req.user;

        const userCurrent = await getOneUserById(user._id);

        if (!userCurrent) {
            return next({
                statusCode: 500,
                message: 'Get user by id failed',
                error: 'Get user by id failed',
            });
        }

        const postUser = await Post.find({ userId: user._id })
            .sort({ updatedAt: 'desc' })
            .catch(() => []);

        let postArray = [];

        return await Promise.all(
            userCurrent.followings.map((x) =>
                Post.find({ userId: x })
                    .sort({ updatedAt: 'desc' })
                    .catch(() => []),
            ),
        )
            .then((response) => {
                postArray = postArray.concat(...response, ...postUser);
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Get post by following successfully',
                    data: {
                        meta: {
                            current: 0,
                            pageSize: 0,
                            pages: 0,
                            total: 0,
                        },
                        result: postArray,
                    },
                });
            })
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get timeline failed',
                    error: 'Get timeline failed',
                }),
            );
    }

    //GET(Chỉ nhận bài post của user có name tương ứng) /post/profile/:username
    async getPostByUserId(req, res, next) {
        const user = await User.findById(req.params._id).catch(() => null);

        if (!user) {
            return next({
                statusCode: 404,
                message: 'Not found user',
                error: 'Not found user',
            });
        }

        Post.find({ userId: user._id })
            .sort({ updatedAt: 'desc' })
            .then((response) =>
                res.status(200).json({
                    statusCode: 200,
                    message: 'Get post by user id successfully',
                    data: {
                        meta: {
                            current: 0,
                            pageSize: 0,
                            pages: 0,
                            total: 0,
                        },
                        result: response,
                    },
                }),
            )
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Get posts user id failed',
                    error: 'Get posts user id failed',
                }),
            );
    }

    //POST /post
    async create(req, res, next) {
        const user = req.user;

        const fileName = req.body.img ?? req.body.video;

        await moveFile(fileName, req, next);

        Post.create({ userId: user._id, ...req.body })
            .then((response) =>
                res.status(201).json({
                    statusCode: 201,
                    message: 'Create a post successfully',
                    data: {
                        ...response._doc,
                    },
                }),
            )
            .catch(() =>
                next({
                    statusCode: 500,
                    message: 'Create post failed',
                    error: 'Create post failed',
                }),
            );
    }

    //DELETE /post/:_id
    async delete(req, res, next) {
        const user = req.user;

        const post = await Post.findById(req.params._id).catch(() => null);

        if (!post) {
            return next({
                statusCode: 404,
                message: 'Not found post to delete',
                error: 'Not found post to delete',
            });
        }

        if (post.userId === user._id) {
            post.deleteOne()
                .then((response) =>
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Delete post successful',
                        data: {
                            ...response,
                        },
                    }),
                )
                .catch(() =>
                    next({
                        statusCode: 500,
                        message: 'Delete post failed',
                        error: 'Delete post failed',
                    }),
                );
        } else {
            return res.status(401).json({
                statusCode: 401,
                message: 'You can only delete your post',
                error: 'You can only delete your post',
            });
        }
    }

    //PUT /post/:_id
    async update(req, res, next) {
        const user = req.user;
        const post = await Post.findById(req.params._id).catch(() => null);

        if (!post) {
            return next({
                statusCode: 404,
                message: 'Not found post to update',
                error: 'Not found post to update',
            });
        }

        if (post.userId === user._id) {
            post.updateOne(req.body)
                .then((response) =>
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Update post successful',
                        data: {
                            ...response,
                        },
                    }),
                )
                .catch(() =>
                    next({
                        statusCode: 500,
                        message: 'Update post failed',
                        error: 'Update post failed',
                    }),
                );
        } else {
            return res.status(401).json({
                statusCode: 401,
                message: 'You can only update your post',
                error: 'You can only update your post',
            });
        }
    }

    //PUT(Like Or Dislike) /post/:id/like
    async like(req, res, next) {
        const user = req.user;
        const post = await Post.findById(req.params._id).catch(() => null);

        if (!post) {
            return next({
                statusCode: 404,
                message: 'Not found post',
                error: 'Not found post',
            });
        }

        if (!post.likes.includes(user._id)) {
            post.updateOne({ $push: { likes: user._id } })
                .then((response) =>
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Like post successfully',
                        data: {
                            ...response,
                        },
                    }),
                )
                .catch(() =>
                    next({
                        statusCode: 500,
                        message: 'Like post failed',
                        error: 'Like post failed',
                    }),
                );
        } else {
            post.updateOne({ $pull: { likes: user._id } })
                .then((response) =>
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Dislike post successfully',
                        data: {
                            ...response,
                        },
                    }),
                )
                .catch(() =>
                    next({
                        statusCode: 500,
                        message: 'Dislike post failed',
                        error: 'Dislike post failed',
                    }),
                );
        }
    }

    uploadFile(req, res, next) {
        // console.log('req.file', req.file);
        // console.log('req.body', req.body);
        return res.status(201).json({
            statusCode: 201,
            message: 'Upload file successfully',
            data: {
                filename: req.file.filename,
            },
        });
    }

    // deleteFile(req, res, next) {
    //     // console.log('req.file', req.file);
    //     // console.log('req.body', req.body);
    //     return res.status(201).json({
    //         statusCode: 201,
    //         message: 'Delete file successfully',
    //         data: {
    //             message: 'Delete file successfully',
    //         },
    //     });
    // }
}

module.exports = new PostController();
