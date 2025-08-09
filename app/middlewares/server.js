const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// const path = require('path');

//Config .env
const env = () => {
    dotenv.config();
};

//Cookie parser
const cookie = (app, express) => {
    app.use(cookieParser());
};

//Enable CORS Policy
const corsPolicy = (app, express) => {
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
const jsonParser = (app, express) => {
    app.use(express.json());
};

//(form html post len server )
const postHtml = (app, express) => {
    app.use(
        express.urlencoded({
            extended: true,
        }),
    );
};

//helmet(security)
const helmetMethod = (app, express) => {
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
const morganMethod = (app, express) => {
    app.use(morgan('common'));
};

const pathImage = (app, express) => {
    // console.log('middleware', path.join(__dirname, '../..', 'public/images'));
    //path Images
    app.use('/images', express.static(path.join(__dirname, '../..', 'public/images')));

    //path Video
    app.use('/videos', express.static(path.join(__dirname, '../..', 'public/videos')));

    //path/test
    app.use('/test', express.static(path.join(__dirname, '../..', 'public/test')));
};

const serverMiddleware = [
    pathImage,
    corsPolicy,
    cookie,
    jsonParser,
    postHtml,
    helmetMethod,
    morganMethod,
    env,
];

module.exports = serverMiddleware;
