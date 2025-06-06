import { configureStore } from "@reduxjs/toolkit";
import reducers from "./slices";
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'octom',
    storage,
    blacklist: ['tasks']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        })
});

export const persistor = persistStore(store);
