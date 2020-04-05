import { LOAD_RUNS, LOAD_RUNS_SUCCESS, LOAD_RUNS_ERROR } from "./constants";
import axios from "axios";

export const loadRuns = () => {
  return (dispatch) => {
    dispatch(loadingRuns());
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .get("http://localhost:4000/run/getAllRuns", config)
      .then((res) => {
        console.log(res.data);
        dispatch(runsLoaded(res.data)); //dispatch user logged in
      })
      .catch((err) => {
        dispatch(runsLoadedError()); //dispatch user not logged in
      });
  };
};

export function loadingRuns(data) {
  return {
    type: LOAD_RUNS,
  };
}
export function runsLoaded(data) {
  return {
    type: LOAD_RUNS_SUCCESS,
    payload: data,
  };
}
export function runsLoadedError() {
  return {
    type: LOAD_RUNS_ERROR,
  };
}
