import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_UPDATED,
  USER_EDIT,
} from "../constants";
import axios from "axios";
import history from "../../helpers/history";
import { loadRuns } from "./runActions";

export const intialAuthCheck = () => {
  return (dispatch) => {
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
          dispatch(loadUser());
          dispatch(loadRuns());
        })
        .catch((err) => {
          dispatch(authError("Session timed out"));
          localStorage.removeItem("token"); //dispatch user not logged in
          history.push("/login");
        });
    }
  };
};

export const authCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: { Authorization: `${token}` },
      };
      axios
        .get(process.env.REACT_APP_SERVER_URL + "/user/authCheck", config)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          dispatch(authError("Session timed out"));
          localStorage.removeItem("token"); //dispatch user not logged in
          history.push("/login");
        });
    }
  };
};

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
          type: USER_LOADED,
          payload: res.data,
        }); //dispatch user logged in
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
      });
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(userLoading());
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess(res.data.user)); //dispatch user logged in
        dispatch(loadRuns());
        history.push("/runs");
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message }); //dispatch user not logged in
      });
  };
};

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
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.user,
        }); //dispatch user logged in
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message }); //dispatch user not logged in
      });
  };
};

export const updateUser = ({ email, fName, lName, sex, age }) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
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
        dispatch(loadUser());
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
      });
  };
};

export const stravaTokenExchange = (code) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/strava/stravaImport",
        {
          code: code,
        },
        config
      )
      .then((res) => {
        history.push("/runs/");
      })
      .catch((err) => {});
  };
};

export function userLoading(data) {
  return {
    type: USER_LOADING,
  };
}

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT_SUCCESS,
  };
};

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

export function userEdit() {
  return {
    type: USER_EDIT,
  };
}

export function authError(msg) {
  return { type: AUTH_ERROR, payload: msg };
}
