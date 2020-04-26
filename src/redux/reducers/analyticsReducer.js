import { LOAD_ANALYTICS, LOAD_ANALYTICS_SUCCESS } from "../constants";

/**
 * Run reducer dictates starting analytics state and handles any redux actions
 */

//Declares initial state
const initialState = {
  totals: {
    distanceSum: 0,
    timeSum: 0,
    runCount: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ANALYTICS: //Load inital analytics
      return {
        ...state,
      };
    case LOAD_ANALYTICS_SUCCESS: //Load analytics success
      return {
        ...state,
        totals: action.payload,
      };
    default:
      return state;
  }
}
