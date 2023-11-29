const routes = {
    home: '/',
    profile: {
        prefix: '/profile',
        params: ':/username',
        path: '/profile/:username',
    },
    login: '/login',
    register: '/register',
};

export default routes;
