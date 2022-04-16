import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

import loginReducer from "./loginReducers";

const persistConfig = {
    key: 'login',
    storage
};


const persistedReducer = persistReducer(persistConfig, loginReducer);

export default persistedReducer;