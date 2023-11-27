const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
    //GET /post
    index(req, res, next) {
        res.json('index');
    }

    //GET /post/:_id
    getOnePost(req, res, next) {
        Post.findById(req.params._id)
            .then((response) => res.json(response))
            .catch(() => next('Get one post failed'));
    }

    //GET(Chỉ nhận bài post của các user mà mình đã theo dõi) /post/timeline
    async getPostByFollowing(req, res, next) {
        const user = await User.findById(req.body._id);
        const postUser = await Post.find({ userId: user._id });
        let postArray = [];
        await Promise.all(user.followings.map((x) => Post.find({ userId: x })))
            .then((response) => {
                postArray = postArray.concat(...response, ...postUser);
            })
            .catch(() => next('Get timeline failed'));
        return res.status(200).json(postArray);
    }

    //POST /post
    create(req, res, next) {
        Post.create(req.body)
            .then((response) => res.status(200).json(response))
            .catch(() => next('Create post failed'));
    }

    //DELETE /post/:id
    async delete(req, res, next) {
        const post = await Post.findById(req.params._id).catch(() => next('Get post by id failed'));
        if (post.userId === req.body.userId) {
            post.deleteOne()
                .then((response) => res.status(200).json('Delete post successful'))
                .catch(() => next('Delete post failed'));
        } else {
            return res.status(403).json('You can only delete your post');
        }
    }

    //PUT /post/:id
    async update(req, res, next) {
        const post = await Post.findById(req.params._id).catch(() => next('Get post by id failed'));
        if (post.userId === req.body.userId) {
            post.updateOne(req.body)
                .then((response) => res.status(200).json('Update post successful'))
                .catch(() => next('Update post failed'));
        } else {
            return res.status(403).json('You can only update your post');
        }
    }

    //PUT(Like Or Dislike) /post/:id/like
    async like(req, res, next) {
        const post = await Post.findById(req.params._id).catch(() => next('Get post by id failed'));
        if (!post.likes.includes(req.body.userId)) {
            post.updateOne({ $push: { likes: req.body.userId } })
                .then((response) => res.status(200).json('The post have been liked'))
                .catch(() => next('Like post failed'));
        } else {
            post.updateOne({ $pull: { likes: req.body.userId } })
                .then((response) => res.status(200).json('The post have been disliked'))
                .catch(() => next('Dislike post failed'));
        }
    }
}

module.exports = new PostController();
