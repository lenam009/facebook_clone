var jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    //Cookies....
    // const token = req.cookies.token;
    const token = req.params.token;
    jwt.verify(token, 'jamas009', (error, data) => {
        if (!data) return next(error);
        req.payloadToken = data;
        next();
    });
};

const authentication = {
    checkToken,
};

// router.use((req, res, next) => {
// const token = req.params.token;
// jwt.verify(token, 'jamas009', (error, data) => {
//     if (!data) return next('Invalid token');
//     next();
// });
// });

module.exports = authentication;
