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
import axios from "axios";
import history from "../../helpers/history";
import { loadRuns } from "./runActions";

/**
 * All authentication/user related actions
 */

//Initial auth check, dispatched when user intially opens RunStats
export const intialAuthCheck = () => {
  return (dispatch) => {
    console.log("initial auth");
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: { Authorization: `${token}` },
      };
      axios
        .get(process.env.REACT_APP_SERVER_URL + "/user/authCheck", config)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          dispatch({ type: AUTH_SUCCESS });
          dispatch(loadUser()); //Load user data
          dispatch(loadRuns()); //Load user runs
        })
        .catch((err) => {
          dispatch(authError("Session timed out")); //Session timed out
          localStorage.removeItem("token"); //remove tken
          history.push("/login"); //push to login
        });
    }
  };
};

//Reoccuring authcheck performed at every route change
export const authCheck = () => {
  return (dispatch) => {
    console.log("authcheck");
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: { Authorization: `${token}` },
      };
      axios
        .get(process.env.REACT_APP_SERVER_URL + "/user/authCheck", config)
        .then((res) => {
          localStorage.setItem("token", res.data.token); //Update with refreshed token
        })
        .catch((err) => {
          dispatch(authError("Session timed out"));
          localStorage.removeItem("token"); //remove token
          history.push("/login"); //push to login
        });
    }
  };
};

//Load user action to get current user data
export const loadUser = () => {
  return (dispatch) => {
    dispatch(userLoading());
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/user/loadUser", config)
      .then((res) => {
        dispatch({
          //Update user data
          type: USER_LOADED,
          payload: res.data,
        });
        dispatch(loadRuns());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Login action get user data and load runs
export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(userLoading());
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token); //Update token
        dispatch(loginSuccess(res.data.user)); //dispatch user logged in, update user data in store
        dispatch(loadRuns());
        history.push("/runs");
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message }); //dispatch auth error
      });
  };
};

//Registration action
export const register = ({ email, password, fName, lName, sex, age }) => {
  return (dispatch) => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/register", {
        email: email,
        password: password,
        fName: fName,
        lName: lName,
        sex: sex,
        age: age,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token); //Update token
        dispatch({
          //Register success action, updates user infromation
          type: REGISTER_SUCCESS,
          payload: res.data.user,
        }); //dispatch user logged in
        dispatch(loadRuns());
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message }); //dispatch auth error
      });
  };
};

//Update user action to change user information
export const updateUser = ({ email, fName, lName, sex, age }) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };

    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/user/update",
        {
          email: email,
          fName: fName,
          lName: lName,
          sex: sex,
          age: age,
        },
        config
      )
      .then((res) => {
        dispatch({
          type: USER_UPDATED,
          payload: {
            email: email,
            userFName: fName,
            userLName: lName,
            sex: sex,
            age: age,
          },
        });
        dispatch(loadUser()); //Load user following update
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message }); //Authentication error
      });
  };
};

//Loading function to indicate user loading in progress
export function userLoading(data) {
  return {
    type: USER_LOADING,
  };
}

//Logout action
export const logout = () => {
  localStorage.removeItem("token"); //remove token
  return {
    type: LOGOUT_SUCCESS,
  };
};

//Login success action, updates store with user information
export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

//Auth error action
export function authError(msg) {
  return { type: AUTH_ERROR, payload: msg };
}
