import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { IUser } from '@/api/userApi';

interface IState {
    user?: IUser | null;
    isFetching?: boolean;
}

const initialState: IState = {
    user: null,
    isFetching: false,
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
    },
});

// Action
export const { setUser, setIsFetching } = userSlice.actions;

//Selector
export const getUserCurrentSelector = (state: RootState) => state.userSlice.user;
export const getIsFetching = (state: RootState) => state.userSlice.isFetching;

export default userSlice.reducer;
