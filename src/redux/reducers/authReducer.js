import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_UPDATED,
} from "../actions/constants";

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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoaded: false,
      };
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoaded: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        initialState,
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
