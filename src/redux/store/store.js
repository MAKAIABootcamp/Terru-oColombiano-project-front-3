import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";
import { loadingReducer } from "../reducers/loadingReducer";

const reducer = {
    users: userReducer,
    loading : loadingReducer,

}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;