const express = require('express');
const router = express.Router();

const PostController = require('../app/controllers/PostController');

router.get('/', PostController.index);

router.get('/timeline/:userId', PostController.getPostByFollowing);

router.get('/profile/:username', PostController.getPostByUsername);

router.get('/:_id', PostController.getOnePost);

router.post('/', PostController.create);

router.delete('/:_id', PostController.delete);

router.put('/:_id', PostController.update);

router.put('/:_id/like', PostController.like);

router.use((err, req, res, next) => {
    res.status(500).json({ service: 'Post_Api', ...err });
});

module.exports = router;
