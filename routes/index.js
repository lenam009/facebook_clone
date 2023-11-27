const userRouter = require('./user');
const authRouter = require('./auth');
const postRouter = require('./post');

function route(app) {
    app.use('/api/user', userRouter);

    app.use('/api/auth', authRouter);

    app.use('/api/post', postRouter);
}

module.exports = route;
