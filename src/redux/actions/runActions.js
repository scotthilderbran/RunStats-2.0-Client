import {
  LOAD_RUNS,
  LOAD_RUNS_SUCCESS,
  LOAD_RUNS_ERROR,
  EDIT_RUN,
  EDIT_RUN_COMPLETE,
  LOAD_ANALYTICS,
  LOAD_ANALYTICS_SUCCESS,
} from "../constants";
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
      .get(process.env.REACT_APP_SERVER_URL + "/run/getAllRuns", config)
      .then((res) => {
        dispatch({
          type: LOAD_RUNS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOAD_RUNS_ERROR,
        });
      });
  };
};

export const deleteRun = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/run/deleteRun",
        {
          id: id,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        dispatch(loadRuns());
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
      });
  };
};

export const updateRun = ({ id, note, distance, time, date }) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/run/updateRun",
        {
          id: id,
          note: note,
          distance: distance,
          time: time,
          date: date,
        },
        config
      )
      .then((res) => {
        dispatch(loadRuns()); //dispatch user logged in
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
      });
  };
};

export const addRun = ({ note, distance, time, date }) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/run/addRun",
        {
          note: note,
          distance: distance,
          time: time,
          date: date,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        dispatch(loadRuns());
      })
      .catch((err) => {
        console.log(err); //dispatch user not logged in
      });
  };
};

export function editRun(data) {
  return {
    type: EDIT_RUN,
    payload: data,
  };
}
export function editRunComplete(data) {
  return {
    type: EDIT_RUN_COMPLETE,
    payload: data,
  };
}

export const getBenchmarks = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    dispatch({
      type: LOAD_ANALYTICS,
    });
    console.log("IN Get Benchmarks");
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/run/getTotals", config)
      .then((res) => {
        console.log(res);
        dispatch({
          type: LOAD_ANALYTICS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
