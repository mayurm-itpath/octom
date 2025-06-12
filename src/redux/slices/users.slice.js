import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/client";
import axios from "axios";

const initialState = {
    userInfo: {},
    isLoggedin: false
}

// Register user
export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.USERS.post({ data });
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Login user
export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.USERS.getUserByEmail({ data });
            if (res[0].password === data.password) {
                return res[0];
            } else {
                console.error('Invalid Login Info');
                throw new Error('Invalid Login Info');
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const usersSlices = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = {};
            state.isLoggedin = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoggedin = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.isLoggedin = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoggedin = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoggedin = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.isLoggedin = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.isLoggedin = false;
            })
    }
});

export const { logout } = usersSlices.actions;

export default usersSlices.reducer;
