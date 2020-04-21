import { combineReducers } from "redux";
import authReducer from "./authReducer";
import runReducer from "./runReducer";
import analyticsReducer from "./analyticsReducer";

/* Root reducer combines auth, run, and analytics reducers into single reducer to initialize store with */

export default combineReducers({
  auth: authReducer,
  run: runReducer,
  analytics: analyticsReducer,
});
