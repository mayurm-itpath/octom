import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/client";
import axios from "axios";

const initialState = {
    tasks: {
        data: [],
        isLoading: false
    }
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.TASKS.getAll(data);
            return res;
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
                state.tasks.data = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                if(axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
    }
});

export default tasksSlice.reducer;
