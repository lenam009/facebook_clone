const express = require('express');
const router = express.Router();

const upload = require('../app/middlewares/upload.file');
const PostController = require('../app/controllers/PostController');

router.get('/', PostController.index);

router.get('/timeline/:userId', PostController.getPostByFollowing);

router.get('/profile/:username', PostController.getPostByUsername);

router.get('/:_id', PostController.getOnePost);

router.post('/', PostController.create);

router.post('/upload', upload.single('file'), PostController.uploadFile);

router.delete('/:_id', PostController.delete);

router.put('/:_id', PostController.update);

router.put('/:_id/like', PostController.like);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'Post_Api', ...err });
});

module.exports = router;
