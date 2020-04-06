import { LOAD_RUNS, LOAD_RUNS_SUCCESS, LOAD_RUNS_ERROR } from "./constants";
import axios from "axios";

export const loadRuns = () => {
  return (dispatch) => {
    dispatch({
      type: LOAD_RUNS,
    });
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .get("http://localhost:4000/run/getAllRuns", config)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: LOAD_RUNS_SUCCESS,
          payload: res.data,
        }); //dispatch user logged in
      })
      .catch((err) => {
        dispatch({
          type: LOAD_RUNS_ERROR,
        }); //dispatch user not logged in
      });
  };
};

export const deleteRun = (id) => {
  return (dispatch) => {
    console.log("deleting runs");
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(
        "http://localhost:4000/run/deleteRun",
        {
          id: id,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        loadRuns();
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
      });
  };
};

/*
export const addRun = (id) => {
  return (dispatch) => {
    console.log("deleting runs");
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(
        "http://localhost:4000/run/deleteRun",
        {
          id: id,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        loadRuns();
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
      });
  };
};
*/
