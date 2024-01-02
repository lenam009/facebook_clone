const jwt = require('jsonwebtoken');

const createJWT = async (payload, secretKey, expiresIn, option = {}) => {
    return new Promise((resolve, reject) =>
        jwt.sign(payload, secretKey, { expiresIn, ...option }, function (err, token) {
            if (err) {
                console.log('error', err);
                return reject(err);
            }

            return resolve(token);
        }),
    );
};

const verifyToken = async (token, secretKey) => {
    return new Promise((resolve, reject) =>
        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                console.log('error', err);
                return reject(err);
            }

            return resolve(decoded);
        }),
    );
};

module.exports = { createJWT, verifyToken };
