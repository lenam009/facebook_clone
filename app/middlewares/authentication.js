var jwt = require('jsonwebtoken');
var JWTAction = require('./JWT.action');

function extractBearerToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkToken = async (req, res, next) => {
    const token = extractBearerToken(req);

    if (token) {
        const decoded = await JWTAction.verifyToken(token, process.env.ACCESS_KEY).catch(
            () => null,
        );

        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                statusCode: 401,
                message: 'Token ko hợp lệ  hoặc đã hết hạn!',
                error: 'Unauthorized',
            });
        }
    } else {
        return res.status(401).json({
            statusCode: 401,
            message: 'Bạn chưa đăng nhập vì access_token ko tồn tại!',
            error: 'Unauthorized',
        });
    }
};

const verifyUserAuth = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            statusCode: 401,
            message: "You're not permission to resolve this work!",
            error: 'Your role not enough to resolve this work!',
        });
    }
};

// const checkUserJWT = (req, res, next) => {
//     const cookies = req.cookies;
//     if (cookies && cookies.refresh_token) {
//         console.log('cookies', cookies);
//     } else {
//         return res.status(401).json({
//             statusCode: 401,
//             message: 'Bạn chưa đăng nhập vì cookies ko tồn tại!',
//             error: 'Unauthorized',
//         });
//     }
// };

const authentication = {
    checkToken,
    verifyUserAuth,
    // checkUserJWT,
};

module.exports = authentication;
