import { combineReducers } from "@reduxjs/toolkit";
import usersSlices from './users.slice';
import tasksSlice from './tasks.slice';

const reducers = combineReducers({
    users: usersSlices,
    tasks: tasksSlice
});

export default reducers;
