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
        console.log("Login ERRR");
        dispatch({ type: AUTH_ERROR, payload: "Incorrect email/password" }); //dispatch user not logged in
      });
  };
};

export const register = ({ email, password, fName, lName, sex, age }) => {
  return (dispatch) => {
    console.log("now here");
    axios
      .post("http://localhost:4000/user/register", {
        email: email,
        password: password,
        fName: fName,
        lName: lName,
        sex: sex,
        age: age,
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

export const updateUser = ({ email, fName, lName, sex, age }) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    console.log(email, fName, lName, sex, age);
    axios
      .post(
        "http://localhost:4000/user/update",
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
        }); //dispatch user logged in
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
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
