import { CHANGE_AVG_VIEW } from "../constants";

const initialState = {
  averageSelection: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_AVG_VIEW:
      return {
        averageSelection: action.payload,
      };
    default:
      return state;
  }
}
