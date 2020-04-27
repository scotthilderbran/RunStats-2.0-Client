import { LOAD_ANALYTICS, LOAD_ANALYTICS_SUCCESS } from "../constants";
import axios from "axios";

/**
 * All analytics actions to update redux store
 */

export const getBenchmarks = () => {
  //Retrieve analytic totals and update store
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
