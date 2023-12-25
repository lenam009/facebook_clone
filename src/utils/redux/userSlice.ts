import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define a type for the slice state

interface IDataUser {
    isLoading: boolean;

    user: IUser | undefined;
}

// Define the initial state using that type
const initialState: IDataUser = {
    isLoading: false,
    user: {
        _id: '',
        username: '',
        email: '',
        profilePicture: '',
        coverPicture: '',
        followers: [],
        followings: [],
        isAdmin: false,
        desc: '',
        city: '',
        from: '',
        createdAt: '',
        updatedAt: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser | undefined>) => {
            state.user = action.payload;
        },
    },
});

export const { setIsLoading, setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getIsLoadingSelector = (state: RootState) => state.userSlice.isLoading;
export const getUserSelector = (state: RootState) => state.userSlice.user;

export default userSlice.reducer;
