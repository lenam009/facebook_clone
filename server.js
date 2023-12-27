const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const routes = require('./routes');
const connect_db = require('./app/connect_db');
const serverMiddleware = require('./app/middlewares/server');
const path = require('path');

//...
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images/post');
//     },
//     filename: (req, file, cb) => {
//         const type = file.mimetype.substring(file.mimetype.indexOf('/') + 1);

//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + type);
//     },
// });
// const upload = multer({ storage });
// app.post('/api/upload', upload.single('file'), function (req, res) {
//     console.log('req.file', req.file);
//     console.log('req.body', req.body);
//     return res.status(200).json({ message: 'Success', filename: req.file.filename });
// });
//...

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
