var jwt = require('jsonwebtoken');

function extractToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkToken = (req, res, next) => {
    const token = extractToken(req);

    if (token) {
        //Bearer xmjfds49
        jwt.verify(token, process.env.ACCESS_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Token ko hợp lệ hoặc đã hết hạn!',
                    error: 'Unauthorized',
                });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(403).json({
            statusCode: 403,
            message: 'Bạn chưa đăng nhập vì access_token ko tồn tại!',
            error: 'Unauthorized',
        });
    }
};

const verifyUserAuth = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user._id === req.params._id)) {
        next();
    } else {
        res.status(401).json({
            statusCode: 401,
            message: "You're not allowed to resolve this work!",
            error: 'Your role not enough to resolve this work!',
        });
    }
};

const authentication = {
    checkToken,
    verifyUserAuth,
};

module.exports = authentication;
