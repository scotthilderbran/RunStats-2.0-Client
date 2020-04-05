import {
  ADD_RUN,
  ADD_RUN_SUCCESS,
  ADD_RUN_ERROR,
  DELETE_RUN,
  DELETE_RUN_SUCCESS,
  DELETE_RUN_ERROR,
  LOAD_RUNS,
  LOAD_RUNS_SUCCESS,
  LOAD_RUNS_ERROR,
} from "../actions/constants";

const initialState = {
  isLoaded: null,
  runs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_RUNS:
      return {
        isLoading: false,
      };
    case LOAD_RUNS_SUCCESS:
      return {
        isLoaded: true,
        runs: action.payload,
      };
    case LOAD_RUNS_ERROR:
      return {
        isLoaded: false,
      };
    default:
      return state;
  }
}
