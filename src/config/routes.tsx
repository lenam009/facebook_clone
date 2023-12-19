const routes = {
    home: '/',
    profile: {
        prefix: '/profile',
        params: ':/username',
        path: '/profile/:username',
    },
    login: '/login',
    register: '/register',
    users: '/users',
};

export default routes;
