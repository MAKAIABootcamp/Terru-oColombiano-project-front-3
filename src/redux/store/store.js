import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/userReducer";
import { loadingReducer } from "../reducers/loadingReducer";
import { placesRedcuer } from "../reducers/placesReducer";

const reducer = {
    users: userReducer,
    loading : loadingReducer,
    places : placesRedcuer,

}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;