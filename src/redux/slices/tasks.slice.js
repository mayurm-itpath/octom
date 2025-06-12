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
            if (userInfo.role === 'user') {
                return res.filter(task => task.userEmail === userInfo.email);
            } else {
                return res;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Search tasks
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

// Sort and filter tasks
export const sortAndFilterTasks = createAsyncThunk(
    'tasks/sortAndFilterTasks',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.TASKS.sortAndFilter({ data });
            return res;
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

// Change status of task
export const changeTaskStatus = createAsyncThunk(
    'tasks/changeTaskStatus',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            await api.TASKS.update({ id, data });
            return;
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
            }).addCase(sortAndFilterTasks.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(sortAndFilterTasks.fulfilled, (state, action) => {
                state.tasks.isLoading = false;
                state.tasks.data = action.payload;
            })
            .addCase(sortAndFilterTasks.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
            .addCase(deleteTask.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.tasks.isLoading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
            .addCase(changeTaskStatus.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(changeTaskStatus.fulfilled, (state) => {
                state.tasks.isLoading = false;
            })
            .addCase(changeTaskStatus.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
            .addCase(addTask.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(addTask.fulfilled, (state) => {
                state.tasks.isLoading = false;
            })
            .addCase(addTask.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
            .addCase(updateTask.pending, (state) => {
                state.tasks.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.tasks.isLoading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                if (axios.isCancel(action.payload)) {
                    return;
                }
                state.tasks.isLoading = false;
            })
    }
});

export default tasksSlice.reducer;
