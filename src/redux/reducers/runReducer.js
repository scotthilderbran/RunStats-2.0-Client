import {
  LOAD_RUNS,
  LOAD_RUNS_SUCCESS,
  LOAD_RUNS_ERROR,
  EDIT_RUN,
  EDIT_RUN_COMPLETE,
  RUN_ERROR,
  IMPORT_SUCCESS,
  IMPORT_ALERT_COMPLETE,
} from "../constants";

/**
 * Run reducer dictates starting run state and handles any redux actions
 */

//Declares initial state
const initialState = {
  isLoaded: false,
  isImported: null,
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
        error: {
          isError: false,
          msg: null,
        },
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
    case IMPORT_SUCCESS: //Run error
      return {
        ...state,
        isImported: true,
      };
    case IMPORT_SUCCESS:
      return {
        ...state,
        isImported: true,
      };
    case IMPORT_ALERT_COMPLETE:
      return {
        ...state,
        isImported: false,
      };
    default:
      return state;
  }
}
