import { combineReducers } from "redux";
import authReducer from "./authReducer";
import runReducer from "./runReducer";
import analyticsReducer from "./analyticsReducer";

export default combineReducers({
  auth: authReducer,
  run: runReducer,
  analytics: analyticsReducer,
});
