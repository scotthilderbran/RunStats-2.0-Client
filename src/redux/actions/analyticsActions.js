import {
  CHANGE_AVG_VIEW,
  LOAD_ANALYTICS,
  LOAD_ANALYTICS_SUCCESS,
} from "../constants";
import axios from "axios";

export function changeAvgView(data) {
  return {
    type: CHANGE_AVG_VIEW,
    payload: data,
  };
}

export const getBenchmarks = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `${token}` },
    };
    dispatch({
      type: LOAD_ANALYTICS,
    });
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/analytic/getTotals", config)
      .then((res) => {
        dispatch({
          type: LOAD_ANALYTICS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
