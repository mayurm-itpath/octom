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

export const searchTasks = createAsyncThunk(
    'tasks/searchTasks',
    async (data, { rejectWithValue }) => {
        try {
            const res1 = await api.TASKS.searchByName({ data });
            const res2 = await api.TASKS.searchByTitle({ data });
            return [...res1, ...res2];
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
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
            .addCase(searchTasks.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(searchTasks.fulfilled, (state, action) => {
                state.tasks.isLoading = false;
                state.tasks.data = _.uniqBy(action.payload, 'id');
            })
            .addCase(searchTasks.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
    }
});

export default tasksSlice.reducer;
