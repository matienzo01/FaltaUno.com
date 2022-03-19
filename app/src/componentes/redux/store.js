import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from "./autorization/authReducer";

import filterReducer from "./filter/filterReducer"

const allReducer = combineReducers({ filter: filterReducer, auth: authReducer })

const store = createStore(allReducer, composeWithDevTools())

export default store