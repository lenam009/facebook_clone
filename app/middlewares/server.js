const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

// const path = require('path');

//Cookie parser
const cookie = (app) => {
    app.use(cookieParser());
};

//Enable CORS Policy
const corsPolicy = (app) => {
    // app.use(cors());
    // const whitelist = ['http://localhost:3000', 'http://example2.com'];

    // app.options('*', cors());

    const corsOptions = {
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        optionSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    app.use(function (req, res, next) {
        res.header('Content-Type', 'application/json;charset=UTF-8');
        res.header('Access-Control-Allow-Credentials', true);
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );

        // res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

        next();
    });
};

//Parser json
const jsonParser = (app) => {
    app.use(express.json());
};

//(form html post len server )
const postHtml = (app) => {
    app.use(
        express.urlencoded({
            extended: true,
        }),
    );
};

//helmet(security)
const helmetMethod = (app) => {
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    imgSrc: [
                        "'self'",
                        'data:',
                        'eu.ui-avatars.com',
                        'blob:',
                        'api.mapbox.com',
                        'cdnjs.cloudflare.com',
                    ],
                    scriptSrc: ['*'],
                    defaultSrc: ["'self'", 'api.mapbox.com'],
                    frameAncestors: ['*'],
                },
            },
        }),
    );
};

//morgan(file log request->server)
const morganMethod = (app) => {
    app.use(morgan('common'));
};

const serverMiddleware = [
    corsPolicy,
    cookie,
    jsonParser,
    postHtml,
    helmetMethod,
    morganMethod,
];

module.exports = serverMiddleware;
