import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'components/GlobalStyle/GlobalStyle.module.scss';
import store from './redux/store';
// import { AxiosRequestHandler } from './api';
import { persistor } from './redux/store';
import Login from './pages/login';
import Header from './components/Header';
import DefaultLayout from './components/layout/DefaultLayout';
import Home from './pages/home';

import {
    createHashRouter,
    Outlet,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    redirect,
} from 'react-router-dom';
import routes from './config/routes';
import Profile from './pages/profile';
import UsersPage from './pages/users';
import Register from './pages/register';
import { defer } from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />

            <Route element={<DefaultLayout />}>
                <Route
                    path={routes.home}
                    element={<Home />}
                    // path={'/:slug'}
                    // loader={async ({}) => {
                    //     // loaders can be async functions
                    //     const res = fetch('http://localhost:8088/api/user/getall').then(
                    //         (res) => res.json(),
                    //     );
                    //     try {
                    //         // const user = res.json();
                    //         return defer({ res });
                    //     } catch (error) {
                    //         throw redirect(routes.login);
                    //     }
                    // }}
                />
                <Route path={routes.profile.path} element={<Profile />} />
                <Route path={routes.users} element={<UsersPage />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Route>,
    ),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* <App /> */}
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>,
);
