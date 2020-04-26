import {
  LOAD_RUNS,
  LOAD_RUNS_SUCCESS,
  LOAD_RUNS_ERROR,
  EDIT_RUN,
  EDIT_RUN_COMPLETE,
  RUN_ERROR,
} from "../constants";
import axios from "axios";

/**
 * All run related actions
 */

//Load all user runs from server
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

//Delete run action to remove run from database
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
        dispatch(loadRuns()); //Reload runs once deleted
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//Update run action to update specific run infromation
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
        dispatch(loadRuns()); //load updated runs once complete
      })
      .catch((err) => {
        console.log(err); //Run update error
        dispatch({ type: RUN_ERROR, payload: err.response.data.message });
      });
  };
};

//Action for user to add run to database
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
        dispatch(loadRuns()); //Load updated runs once added
      })
      .catch((err) => {
        console.log(err); //Run add error
        dispatch({ type: RUN_ERROR, payload: err.response.data.message });
      });
  };
};

//Edit run action to indicate user editing runs
export function editRun(data) {
  return {
    type: EDIT_RUN,
    payload: data, //Passes id of run to be edited to store
  };
}

//Complete edit action
export function editRunComplete(data) {
  return {
    type: EDIT_RUN_COMPLETE,
    payload: data,
  };
}
