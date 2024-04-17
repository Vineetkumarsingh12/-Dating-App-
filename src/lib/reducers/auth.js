import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAdmin: false,
        isLoading: true,
    },
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        userDoesNotExist: (state) => {
            state.user = null;
            state.isLoading = false;
        },


    },
});

export const {userDoesNotExist,userExists  } = authSlice.actions;
export default authSlice.reducer;