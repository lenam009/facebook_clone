const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class AuthController {
    //POST /auth/register
    async register(req, res, next) {
        const saltRounds = 10;
        const hassPassword = await bcrypt.hash(req.body.password, saltRounds).catch(() =>
            next({
                successful: false,
                message: 'Create hash password failed',
            }),
        );

        req.body.password = hassPassword;

        User.create(req.body)
            .then((response) => {
                const { password, ...payloads } = response._doc;
                return res.status(200).json({
                    successful: true,
                    // token,
                    // isAdmin: user.isAdmin,
                    user: payloads,
                });
            })
            .catch(() =>
                next({
                    successful: false,
                    message: 'Register valid',
                }),
            );
    }

    //POST /auth/login
    async login(req, res, next) {
        //Get user
        const user = await User.findOne({ email: req.body.email })
            .then((response) => {
                if (!response)
                    return res.status(403).json({
                        email: false,
                    });
                return response;
            })
            .catch(() =>
                next({
                    successful: false,
                }),
            );

        //Check password
        bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
                if (!result)
                    return res.status(403).json({
                        password: false,
                    });
                const token = jwt.sign({ _id: user._id }, 'jamas009');
                const { password, ...payloads } = user._doc;
                return res.status(200).json({
                    successful: true,
                    token,
                    isAdmin: user.isAdmin,
                    user: payloads,
                });
            })
            .catch(() =>
                next({
                    successful: false,
                }),
            );
    }
}

module.exports = new AuthController();
