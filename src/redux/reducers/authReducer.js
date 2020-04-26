import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_UPDATED,
} from "../constants";

/**
 * Auth reducer dictates starting auth state and handles any redux actions
 */

//Declares initial state
const initialState = {
  isAuthenticated: false,
  isLoaded: false,
  user: {
    email: null,
    userFName: "user",
    userLName: null,
    sex: null,
    age: null,
  },
  error: {
    isError: false,
    msg: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING: //User loading in progress
      return {
        ...state,
        isLoaded: false,
      };
    case USER_LOADED: //User loading complete
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoaded: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: //Either successful login or registration, updates user info
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoaded: true,
        error: {
          isError: null,
          msg: null,
        },
      };
    case AUTH_SUCCESS: //Auth success
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTH_ERROR: //Auth Error
      return {
        ...state,
        isAuthenticated: false,
        error: {
          isError: true,
          msg: action.payload,
        },
      };
    case LOGOUT_SUCCESS: //Logout success, clears state
      return {
        isAuthenticated: false,
        isLoaded: false,
        user: {
          email: null,
          userFName: "user",
          userLName: null,
          sex: null,
          age: null,
        },
        error: {
          isError: null,
          msg: null,
        },
      };
    case USER_UPDATED: //Updates user information
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
