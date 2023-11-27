import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import routes from './config/routes';
import Home from './pages/home';
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
                        path={routes.admin}
                        element={
                            <DefaultLayout>
                                <div style={{ height: '1000px', backgroundColor: 'pink' }}>Admin</div>
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
