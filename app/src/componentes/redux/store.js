import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'

import filterReducer from "./filter/filterReducer"

const allReducer = combineReducers({ filter: filterReducer })

const store = createStore(allReducer, composeWithDevTools())

export default store