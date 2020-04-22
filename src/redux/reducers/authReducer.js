import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_UPDATED,
} from "../constants";

/* Auth reducer dictates starting auth state and handles any redux actions */

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
    case USER_LOADING:
      return {
        ...state,
        isLoaded: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoaded: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
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
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: {
          isError: true,
          msg: action.payload,
        },
      };
    case LOGOUT_SUCCESS:
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
    case USER_UPDATED:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
