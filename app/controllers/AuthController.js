const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var JWTAction = require('../middlewares/JWT.action');

let refreshTokenArray = [];

const generateAccessToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    const access_token = await JWTAction.createJWT(
        payload,
        process.env.ACCESS_KEY,
        '7d',
    ).catch((err) => null);

    return access_token;
};

const generateRefreshToken = async (user) => {
    const payload = { _id: user._id, email: user.email };

    const refresh_token = await JWTAction.createJWT(
        payload,
        process.env.REFRESH_KEY,
        '8d',
    ).catch((err) => null);

    return refresh_token;
};

class AuthController {
    //POST /auth/register
    async register(req, res, next) {
        const salt = await bcrypt.genSalt(10);
        const hassPassword = await bcrypt.hash(req.body.password, salt).catch(() => null);

        if (!hassPassword) {
            return next({
                statusCode: 500,
                successful: false,
                message: 'Create hash password failed',
            });
        }

        req.body.password = hassPassword;

        User.create(req.body)
            .then((response) => {
                const { password, ...payloads } = response._doc;
                return res.status(200).json({
                    statusCode: 201,
                    message: 'Login successfully',
                    data: {
                        _id: response._id,
                        createdAt: response.createdAt,
                    },
                });
            })
            .catch(() =>
                next({
                    statusCode: 400,
                    message: `Email ${req.body.email} is exists. Please register another email.`,
                    error: 'Bad request',
                }),
            );
    }

    //POST /auth/login
    async login(req, res, next) {
        //Muốn ko dùng return thì ko được dùng trong then
        //Get user
        console.log('Cookies: ', req.cookies);

        const user = await User.findOne({ email: req.body.email })
            .then((response) => {
                if (!response)
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Email not correct!',
                        error: 'Unauthorized',
                    });
                return response;
            })
            .catch(() => null);

        if (!user) {
            return next({
                statusCode: 401,
                message: 'Login email failed',
                error: 'Unauthorized',
            });
        }

        //Check password
        bcrypt
            .compare(req.body.password, user.password)
            .then(async (result) => {
                if (!result)
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Password not correct!',
                        error: 'Unauthorized',
                    });

                const access_token = await generateAccessToken(user);
                const refresh_token = await generateRefreshToken(user);

                if (!access_token | !refresh_token) {
                    return next({
                        statusCode: 500,
                        message: 'Create token failed',
                        error: 'Unauthorized',
                    });
                }

                refreshTokenArray.push(refresh_token);

                //Lưu refresh_token vào cookie...
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/',
                    maxAge: 60 * 60 * 1000,
                });

                const { password, ...payloads } = user._doc;
                return res.status(201).json({
                    statusCode: 201,
                    message: 'Login successfully',
                    data: { access_token, refresh_token, user: payloads },
                });
            })
            .catch(() =>
                next({
                    statusCode: 401,
                    message: 'Login password failed',
                    error: 'Unauthorized',
                }),
            );
    }

    //GET /auth/logout (Remove refresh token)
    logout(req, res, next) {
        const refresh_token = req.cookies.refresh_token;

        res.clearCookie('refresh_token');
        refreshTokenArray = refreshTokenArray.filter((x) => x !== refresh_token);

        return res.status(200).json({
            statusCode: 200,
            message: 'Logout successfully',
            data: {
                deletedCookie: true,
            },
        });
    }

    //GET /auth/refresh
    refreshToken(req, res, next) {
        const refresh_token = req.cookies.refresh_token;
        // console.log(refresh_token);
        if (refresh_token) {
            jwt.verify(refresh_token, process.env.REFRESH_KEY, (error, user) => {
                if (error) {
                    return res.status(401).json({
                        statusCode: 401,
                        message: "You're not authenticated",
                        error: 'Unauthorized',
                    });
                }
                if (!refreshTokenArray.includes(refresh_token)) {
                    return res.status(403).json({
                        statusCode: 403,
                        message: 'Refresh token invalid',
                        error: 'Unauthorized',
                    });
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
                    statusCode: 201,
                    message: 'Refresh token successfully',
                    data: {
                        access_token: new_access_token,
                        refresh_token: new_refresh_token,
                    },
                });
            });
        } else {
            return res.status(401).json({
                statusCode: 401,
                message: "You're not authenticated because not exists refresh_token",
                error: 'Unauthorized',
            });
        }
    }
}

module.exports = new AuthController();
