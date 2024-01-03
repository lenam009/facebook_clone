const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const authenticationMiddleware = require('../app/middlewares/authentication');

//Tham khảo cách mới ........
const checkUserJWT = (req, res, next) => {
    const nonSecurePaths = [
        { path: '/', method: 'GET' },
        { path: '/getall', method: 'GET' },
        { path: '/getUserByFollowing', method: 'GET' },
    ];

    console.log('path', req.path);

    if (
        nonSecurePaths.some((x) => req.path.includes(x.path) && x.method === req.method)
    ) {
        return next();
    }

    //authenticate user
    authenticationMiddleware.checkToken(req, res, next);
};

router.use(checkUserJWT);

router.get('/', UserController.getOneUser);

router.get('/getall', UserController.getall);

router.get('/getUserByFollowing/:_id', UserController.getUserByFollowing);

router.get('/getUserRandom', UserController.getUserRandom);

router.put('/', UserController.update);

router.delete('/:_id', authenticationMiddleware.verifyUserAuth, UserController.delete);

router.put('/:_id/follow', UserController.follow);

router.put('/:_id/unfollow', UserController.unfollow);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'User_Api', ...err });
});

module.exports = router;
