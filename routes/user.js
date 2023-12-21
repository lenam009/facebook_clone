const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const authenticationMiddleware = require('../app/middlewares/authentication');

router.get('/', UserController.getOneUser);

router.get('/getall', authenticationMiddleware.checkToken, UserController.getall);

router.put('/:_id', UserController.update);

router.delete(
    '/:_id',
    // authenticationMiddleware.checkToken,
    // authenticationMiddleware.verifyAdminAuth,
    UserController.delete,
);

router.put('/:_id/follow', UserController.follow);

router.put('/:_id/unfollow', UserController.unfollow);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'User_Api', ...err });
});

module.exports = router;
