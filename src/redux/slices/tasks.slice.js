import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/client";
import axios from "axios";
import _ from "lodash";

const initialState = {
    tasks: {
        data: [],
        isLoading: false
    }
}

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (data, { rejectWithValue, getState }) => {
        try {
            const userInfo = getState().users.userInfo;
            const res = await api.TASKS.getAll(data);
            return {
                user: userInfo,
                tasks: res
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Add task
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (data, { rejectWithValue }) => {
        try {
            await api.TASKS.post({ data });
            return;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Update task
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            await api.TASKS.update({ id, data });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Delete task
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            await api.TASKS.delete({ id });
            return;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks.isLoading = false;
                const clone = [...action.payload.tasks]
                if(action.payload.user?.role === 'user'){
                    state.tasks.data = clone.filter(val => val.userEmail === action.payload.user?.email)
                }else {
                    state.tasks.data = clone
                }
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
    }
});

export default tasksSlice.reducer;
