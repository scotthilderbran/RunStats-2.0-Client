import {
  CHANGE_AVG_VIEW,
  LOAD_ANALYTICS,
  LOAD_ANALYTICS_SUCCESS,
} from "../constants";

/* Run reducer dictates starting analytics state and handles any redux actions */

const initialState = {
  averageSelection: 1,
  totals: {
    distanceSum: 0,
    timeSum: 0,
    runCount: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_AVG_VIEW:
      return {
        averageSelection: action.payload,
      };
    case LOAD_ANALYTICS:
      return {
        ...state,
      };
    case LOAD_ANALYTICS_SUCCESS:
      return {
        ...state,
        totals: action.payload,
      };
    default:
      return state;
  }
}
