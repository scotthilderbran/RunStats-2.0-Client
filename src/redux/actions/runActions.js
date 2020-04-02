import { ADD_RUN, DELETE_RUN } from "./constants";

export function addRun(data) {
  console.log("Action hit");
  return {
    type: ADD_RUN,
    payload: data
  };
}

export function deleteRun(data) {
  return {
    type: DELETE_RUN,
    payload: data
  };
}
