import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_UPDATED,
  USER_EDIT,
} from "../constants";
import axios from "axios";
import history from "../../components/helpers/history";
import { loadRuns } from "./runActions";

export const loadUser = () => {
  console.log("USER_LOADING");
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
        console.log(err);
        //dispatch(); //dispatch user not logged in
      });
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(userLoading());
    console.log("now here");
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess(res.data.user)); //dispatch user logged in
        console.log("res.data.user");
        console.log(res);
        dispatch(loadRuns());
        history.push("/runs");
      })
      .catch((err) => {
        console.log("Login ERRR");
        dispatch({ type: AUTH_ERROR, payload: err.response.data.message }); //dispatch user not logged in
      });
  };
};

export const register = ({ email, password, fName, lName, sex, age }) => {
  return (dispatch) => {
    console.log("now here");
    console.log(email, password, fName, lName, sex, age);
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
        console.log("register err response:");
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
      })
      .catch((err) => {
        console.log("update error caught");
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
        process.env.REACT_APP_SERVER_URL + "/strava/stravaTokenExchange",
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
