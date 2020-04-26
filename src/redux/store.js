import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

/**
 * Initializes store with root reducer, applies thunk middleware to run async actions
 * Also initializes with redux dev tools for easy debugging
 */

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
