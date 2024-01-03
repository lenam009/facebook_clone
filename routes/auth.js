const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');
const authenticationMiddleware = require('../app/middlewares/authentication');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/refresh', authenticationMiddleware.checkToken, AuthController.refreshToken);

router.get('/logout', authenticationMiddleware.checkToken, AuthController.logout);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'Auth_Api', ...err });
});

module.exports = router;
