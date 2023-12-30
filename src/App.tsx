import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import routes from './config/routes';
import Home from './pages/home';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import DefaultLayout from 'components/layout/DefaultLayout';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';
import UsersPage from './pages/users';

function App() {
    let user = useAppSelector(getUserCurrentSelector);

    return (
        // <Router basename={process.env.PUBLIC_URL}>
        //     <div className="App">
        //         <Routes>
        //             <Route
        //                 path={routes.home}
        //                 element={
        //                     <DefaultLayout>
        //                         <Home />
        //                     </DefaultLayout>
        //                 }
        //             />
        //             {/* !user ? (
        //             <Navigate to={routes.login} />) : (
        //             <DefaultLayout>
        //                 <Home />
        //             </DefaultLayout>
        //             ) */}
        //             <Route
        //                 path={routes.profile.path}
        //                 element={
        //                     <DefaultLayout>
        //                         <Profile />
        //                     </DefaultLayout>
        //                 }
        //             />
        //             <Route
        //                 path={routes.users}
        //                 element={
        //                     <DefaultLayout>
        //                         <UsersPage />
        //                     </DefaultLayout>
        //                 }
        //             />
        //             <Route
        //                 path={routes.login}
        //                 // user ? <Navigate to={routes.home} /> : <Login />
        //                 element={<Login />}
        //             />
        //             <Route path={routes.register} element={<Register />} />
        //         </Routes>
        //     </div>
        // </Router>
        <>App tsx</>
    );
}

export default App;
