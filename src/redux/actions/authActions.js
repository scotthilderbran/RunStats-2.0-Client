import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./constants";
import { returnErrors } from "./errorActions";
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
      .get("http://localhost:4000/user/loadUser", config)
      .then((res) => {
        console.log("This is the response");
        console.log(res.data);
        dispatch(loginSuccess(res.data)); //dispatch user logged in
      })
      .catch((err) => {
        console.log("Realshit");
        //dispatch(); //dispatch user not logged in
      });
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(userLoading());
    console.log("now here");
    axios
      .post("http://localhost:4000/user/login", {
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
        //dispatch(); //dispatch user not logged in
      });
  };
};

export const register = ({ email, password, fName, lName, sex }) => {
  return (dispatch) => {
    console.log("now here");

    axios
      .post("http://localhost:4000/user/register", {
        email: email,
        password: password,
        fName: fName,
        lName: lName,
        sex: sex,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(registerSuccess(res.data.user)); //dispatch user logged in
      })
      .catch((err) => {
        dispatch(registerFailure(err)); //dispatch user not logged in
      });
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

export function loginFailure(data) {
  return {
    type: LOGIN_FAIL,
    payload: data,
  };
}
export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
}

export function registerFailure(data) {
  return {
    type: REGISTER_FAIL,
    payload: data,
  };
}
