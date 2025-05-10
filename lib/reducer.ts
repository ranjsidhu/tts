import { combineReducers } from "redux";
import UI from "./features/UI";
import auth from "./features/auth";

const rootReducer = combineReducers({ UI, auth });
export default rootReducer;
