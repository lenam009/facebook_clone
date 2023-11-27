const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');
const authenticationMiddleware = require('../app/middlewares/authentication');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.use((err, req, res, next) => {
    res.status(500).json('Auth_Api: ' + err);
});

module.exports = router;
