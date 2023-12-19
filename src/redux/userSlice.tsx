import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { IUser } from '@/api/userApi';

interface IState {
    user: IUser | null;
    isFetching: boolean;
    error: boolean;
    success?: boolean;
}

const initialState: IState = {
    user: null,
    isFetching: false,
    error: false,
    success: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },

        // JWT...
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action: PayloadAction<IUser | null>) => {
            state.isFetching = false;
            state.user = action.payload;
            state.error = false;
        },
        loginFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Register
        registerStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
            state.success = true;
        },
        registerFailed: (state) => {
            state.isFetching = false;
            state.error = true;
            state.success = false;
        },
    },
});

// Action
export const {
    setUser,
    setIsFetching,
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
} = userSlice.actions;

//Selector
export const getUserCurrentSelector = (state: RootState) => state.userSlice.user;
export const getIsFetching = (state: RootState) => state.userSlice.isFetching;
export const getIsErrorSelector = (state: RootState) => state.userSlice.error;
export const getIsSuccessSelector = (state: RootState) => state.userSlice.success;

export default userSlice.reducer;
