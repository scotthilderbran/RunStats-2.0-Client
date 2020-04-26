import {
  LOAD_RUNS,
  LOAD_RUNS_SUCCESS,
  LOAD_RUNS_ERROR,
  EDIT_RUN,
  EDIT_RUN_COMPLETE,
  RUN_ERROR,
} from "../constants";

/**
 * Run reducer dictates starting run state and handles any redux actions
 */

//Declares initial state
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
    case LOAD_RUNS: //Loading runs in progress
      return {
        ...state,
        isLoaded: false,
      };
    case LOAD_RUNS_SUCCESS: //Loading runs complete
      return {
        ...state,
        isLoaded: true,
        runs: action.payload,
      };
    case LOAD_RUNS_ERROR: //Loading runs error
      return {
        ...state,
        isLoaded: false,
      };
    case EDIT_RUN: //Editing run, sets id of current edit run
      return {
        ...state,
        edit: action.payload,
      };
    case EDIT_RUN_COMPLETE: //Edit run complete
      return {
        ...state,
        edit: {
          isEdit: false,
          currID: null,
        },
      };
    case RUN_ERROR: //Run error
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
