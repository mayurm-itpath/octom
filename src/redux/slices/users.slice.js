import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
    isLoggedin: false
}

const usersSlices = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedin = true;
        },
        logout: (state) => {
            state.userInfo = {};
            state.isLoggedin = false;
        }
    }
});

export const { login, logout } = usersSlices.actions;

export default usersSlices.reducer;
