'use client';
import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/utils/redux/store';

export default function ReduxWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <>{children}</>
            </PersistGate>
        </Provider>
    );
}
