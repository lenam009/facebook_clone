const userRouter = require('./user');
const authRouter = require('./auth');
const postRouter = require('./post');
const uploadRouter = require('./upload');

function route(app) {
    app.use('/api/user', userRouter);

    app.use('/api/auth', authRouter);

    app.use('/api/post', postRouter);

    app.use('/api/upload', uploadRouter);
}

module.exports = route;
