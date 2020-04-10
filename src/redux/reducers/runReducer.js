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
  EDIT_RUN,
  EDIT_RUN_COMPLETE,
} from "../actions/constants";

const initialState = {
  isLoaded: false,
  runs: [],
  edit: {
    isEdit: false,
    currID: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_RUNS:
      return {
        ...state,
        isLoading: false,
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
    default:
      return state;
  }
}
