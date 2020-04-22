import {
  LOAD_RUNS,
  LOAD_RUNS_SUCCESS,
  LOAD_RUNS_ERROR,
  EDIT_RUN,
  EDIT_RUN_COMPLETE,
  RUN_ERROR,
} from "../constants";

/* Run reducer dictates starting run state and handles any redux actions */

const initialState = {
  isLoaded: false,
  runs: [],
  edit: {
    isEdit: false,
    currID: null,
  },
  error: {
    isError: false,
    msg: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_RUNS:
      return {
        ...state,
        isLoaded: false,
      };
    case LOAD_RUNS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        runs: action.payload,
      };
    case LOAD_RUNS_ERROR:
      return {
        ...state,
        isLoaded: false,
      };
    case EDIT_RUN:
      return {
        ...state,
        edit: action.payload,
      };
    case EDIT_RUN_COMPLETE:
      return {
        ...state,
        edit: {
          isEdit: false,
          currID: null,
        },
      };
    case RUN_ERROR:
      return {
        ...state,
        error: {
          isError: true,
          msg: action.payload,
        },
      };
    default:
      return state;
  }
}
