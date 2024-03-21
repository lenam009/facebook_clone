const express = require('express');
const router = express.Router();

const upload = require('../app/middlewares/upload.file');
const PostController = require('../app/controllers/PostController');
const authenticationMiddleware = require('../app/middlewares/authentication');

router.get('/', PostController.index);

router.get(
    '/timeline',
    authenticationMiddleware.checkToken,
    PostController.getPostByFollowing,
);

router.get('/profile/:_id', PostController.getPostByUserId);

router.get('/:_id', PostController.getOnePost);

router.post('/', authenticationMiddleware.checkToken, PostController.create);

// router.post(
//     '/upload',
//     authenticationMiddleware.checkToken,
//     upload.uploadFile.single('file'),
//     PostController.uploadFile,
// );

// router.delete(
//     '/deleteFile',
//     authenticationMiddleware.checkToken,
//     deleteFile()
//     PostController.deleteFile,
// );

router.delete('/:_id', authenticationMiddleware.checkToken, PostController.delete);

router.put('/:_id', authenticationMiddleware.checkToken, PostController.update);

router.put('/:_id/like', authenticationMiddleware.checkToken, PostController.like);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'Post_Api', ...err });
});

module.exports = router;
