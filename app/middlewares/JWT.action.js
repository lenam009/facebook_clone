const jwt = require('jsonwebtoken');

const createJWT = async (payload, expiresIn, option = {}) => {
    return new Promise((resolve, reject) =>
        jwt.sign(
            payload,
            process.env.ACCESS_KEY,
            { expiresIn, ...option },
            function (err, token) {
                if (err) {
                    console.log('error', err);
                    return reject(err);
                }

                return resolve(token);
            },
        ),
    );
};

const verifyToken = async (token) => {
    return new Promise((resolve, reject) =>
        jwt.verify(token, process.env.ACCESS_KEY, function (err, decoded) {
            if (err) {
                console.log('error', err);
                return reject(err);
            }

            return resolve(decoded);
        }),
    );
};

module.exports = { createJWT, verifyToken };
