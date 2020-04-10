import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import runReducer from "./runReducer";
import analyticsReducer from "./analyticsReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  run: runReducer,
  analytics: analyticsReducer,
});
