const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class AuthController {
    //POST /auth/register
    async register(req, res, next) {
        const saltRounds = 10;
        const hassPassword = await bcrypt
            .hash(req.body.password, saltRounds)
            .catch(() => next('Create hash password failed'));

        req.body.password = hassPassword;

        User.create(req.body)
            .then((response) => res.status(200).json(response))
            .catch(() => next('Register Invalid'));
    }

    //POST /auth/login
    async login(req, res, next) {
        //Get user
        const user = await User.findOne({ email: req.body.email })
            .then((response) => {
                if (!response) return res.status(403).json('Email incorrect');
                return response;
            })
            .catch(() => next('Login Invalid'));

        //Check password
        bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
                if (!result) return res.status(403).json('Password incorrect');
                const token = jwt.sign({ _id: user._id }, 'jamas009');
                return res.status(200).json({
                    message: 'Successful login',
                    token,
                    isAdmin: user.isAdmin,
                    // payloadUser: user,
                });
            })
            .catch(() => next('Check password invalid'));
    }
}

module.exports = new AuthController();
