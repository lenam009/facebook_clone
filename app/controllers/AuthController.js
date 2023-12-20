const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

let refreshTokenArray = [];

const generateAccessToken = (user) => {
    const access_token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_KEY,
        {
            expiresIn: '3s',
        },
    );

    return access_token;
};

const generateRefreshToken = (user) => {
    const refresh_token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.REFRESH_KEY,
        {
            expiresIn: '365d',
        },
    );

    return refresh_token;
};

class AuthController {
    //POST /auth/register
    async register(req, res, next) {
        const salt = await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(req.body.password, salt).catch(() =>
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
                    user: payloads,
                });
            })
            .catch((error) =>
                next({
                    successful: false,
                    message: 'Email đã tồn tại!',
                    error,
                }),
            );
    }

    //POST /auth/login
    async login(req, res, next) {
        //Muốn ko dùng return thì ko được dùng trong then
        //Get user
        const user = await User.findOne({ email: req.body.email })
            .then((response) => {
                if (!response)
                    return res.status(404).json({
                        email: false,
                        message: 'Email ko chính xác!',
                    });
                return response;
            })
            .catch((error) =>
                next({
                    successful: false,
                    error,
                }),
            );

        //Check password
        bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
                if (!result)
                    return res.status(403).json({
                        password: false,
                        message: 'Password ko chính xác!',
                    });

                const access_token = generateAccessToken(user);

                const refresh_token = generateRefreshToken(user);
                refreshTokenArray.push(refresh_token);

                //Lưu refresh_token vào cookie...
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/',
                });

                const { password, ...payloads } = user._doc;
                return res.status(200).json({
                    successful: true,
                    user: { access_token, refresh_token, ...payloads },
                });
            })
            .catch((error) =>
                next({
                    successful: false,
                }),
            );
    }

    //GET /auth/logout (Remove refresh token)
    logout(req, res, next) {
        const refresh_token = req.cookies.refresh_token;

        res.clearCookie('refresh_token');
        refreshTokenArray = refreshTokenArray.filter((x) => x !== refresh_token);

        return res.status(200).json({ message: 'Logout successfully' });
    }

    //GET /auth/refresh
    refreshToken(req, res, next) {
        const refresh_token = req.cookies.refresh_token;
        console.log(refresh_token);
        if (refresh_token) {
            jwt.verify(refresh_token, process.env.REFRESH_KEY, (error, user) => {
                if (error) {
                    return res.status(401).json({ message: "You're not authenticated" });
                }
                if (!refreshTokenArray.includes(refresh_token)) {
                    return res.status(403).json({ message: 'Refresh token invalid' });
                }

                refreshTokenArray = refreshTokenArray.filter((x) => x !== refresh_token);

                const new_access_token = generateAccessToken(user);
                const new_refresh_token = generateRefreshToken(user);
                refreshTokenArray.push(new_refresh_token);

                res.cookie('refresh_token', new_refresh_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });

                return res.status(201).json({
                    message: 'Refresh token successfully',
                    access_token: new_access_token,
                });
            });
        } else {
            res.status(401).json({ message: "You're not authenticated" });
        }
    }
}

module.exports = new AuthController();
