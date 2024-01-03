const express = require('express');
const app = express();
const dotenv = require('dotenv');

const routes = require('./routes');
const connect_db = require('./app/connect_db');
const serverMiddleware = require('./app/middlewares/server');
const path = require('path');

//path Images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//path Video
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

//path/test
app.use('/test', express.static(path.join(__dirname, 'public/test')));

//Middleware server
serverMiddleware.map((x) => x(app));

//Config .env
dotenv.config();

//Connect database
connect_db.connect();

//Setting routes
routes(app);

app.get('/', (req, res, next) => {
    res.send('Welcome to cloudls');
});

const port = 8088;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
