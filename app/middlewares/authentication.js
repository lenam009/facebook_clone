var jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    //Cookies....
    // const token = req.cookies.token;
    const token = req.headers.token;

    if (token) {
        //Bearer xmjfds49
        const access_token = token.split(' ')[1];

        jwt.verify(access_token, process.env.ACCESS_KEY, (error, user) => {
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
