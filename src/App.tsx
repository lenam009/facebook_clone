import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import routes from './config/routes';
import Home from './pages/home';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import DefaultLayout from 'components/layout/DefaultLayout';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="App">
                <Routes>
                    <Route
                        path={routes.home}
                        element={
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        }
                    />
                    <Route
                        path={routes.profile}
                        element={
                            <DefaultLayout>
                                <Profile />
                            </DefaultLayout>
                        }
                    />
                    <Route path={routes.login} element={<Login />} />
                    <Route path={routes.register} element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
