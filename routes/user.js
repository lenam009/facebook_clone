const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const authenticationMiddleware = require('../app/middlewares/authentication');

router.get(
    '/',
    (req, res, next) => {
        setTimeout(() => {
            next();
        }, 2000);
    },
    UserController.getOneUser,
);

router.get('/getall', authenticationMiddleware.checkToken, UserController.getall);

router.get('/getUserByFollowing/:_id', UserController.getUserByFollowing);

router.get(
    '/getUserRandom',
    authenticationMiddleware.checkToken,
    UserController.getUserRandom,
);

router.put('/', authenticationMiddleware.checkToken, UserController.update);

router.delete(
    '/:_id',
    authenticationMiddleware.checkToken,
    authenticationMiddleware.verifyUserAuth,
    UserController.delete,
);

router.put('/:_id/follow', authenticationMiddleware.checkToken, UserController.follow);

router.put(
    '/:_id/unfollow',
    authenticationMiddleware.checkToken,
    UserController.unfollow,
);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'User_Api', ...err });
});

module.exports = router;
