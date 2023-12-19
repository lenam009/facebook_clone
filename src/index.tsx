import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'components/GlobalStyle/GlobalStyle.module.scss';
import store from './redux/store';
import { AxiosRequestHandler } from './api';
import { persistor } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AxiosRequestHandler>
                <App />
            </AxiosRequestHandler>
        </PersistGate>
    </Provider>,
);
