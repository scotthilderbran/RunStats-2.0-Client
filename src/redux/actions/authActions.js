import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./constants";
import { returnErrors } from "./errorActions";
import axios from "axios";
import history from "../../components/helpers/history";

export const login = ({ email, password }) => {
  return dispatch => {
    console.log("now here");

    axios
      .post("http://localhost:4000/user/login", {
        email: email,
        password: password
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.user);
        dispatch(loginSuccess(res.data.user)); //dispatch user logged in
        history.push("/analytics");
      })
      .catch(err => {
        dispatch(); //dispatch user not logged in
      });
  };
};

export const register = ({ email, password, fName, lName, sex }) => {
  return dispatch => {
    console.log("now here");

    axios
      .post("http://localhost:4000/user/register", {
        email: email,
        password: password,
        fName: fName,
        lName: lName,
        sex: sex
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        dispatch(registerSuccess(res.data.user)); //dispatch user logged in
      })
      .catch(err => {
        dispatch(registerFailure(err)); //dispatch user not logged in
      });
  };
};

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAIL,
    payload: data
  };
}
export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  };
}

export function registerFailure(data) {
  return {
    type: REGISTER_FAIL,
    payload: data
  };
}
