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
    console.log('token', token);

    if (token) {
        //Bearer xmjfds49
        // const access_token = token.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_KEY, (error, user) => {
            if (error) {
                res.status(403).json({
                    statusCode: 403,
                    message: 'Token ko hợp lệ hoặc đã hết hạn!',
                });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            statusCode: 401,
            message: 'Bạn chưa đăng nhập vì access_token ko tồn tại!',
        });
    }
};

const verifyAdminAuth = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user._id === req.params._id)) {
        next();
    } else {
        res.status(403).json({
            statusCode: 403,
            message: "You're not allowed to resolve this work!",
        });
    }
};

const authentication = {
    checkToken,
    verifyAdminAuth,
};

module.exports = authentication;
