const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

//Cookie parser
const cookie = (app) => {
    app.use(cookieParser());
};

//Enable CORS Policy
const corsPolicy = (app) => {
    app.use(cors());
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
    app.use(helmet());
};

//morgan(file log request->server)
const morganMethod = (app) => {
    app.use(morgan('common'));
};

//public/images
const pathImages = (app) => {
    app.use('/images', express.static(path.join(pathDirname, 'public/images')));
};

const serverMiddleware = [
    cookie,
    corsPolicy,
    jsonParser,
    postHtml,
    helmetMethod,
    morganMethod,
];

module.exports = serverMiddleware;