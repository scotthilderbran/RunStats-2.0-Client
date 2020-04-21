import axios from "axios";
import {
  loadAnalytics,
  loadAnalyticsSuccess,
} from "../redux/actions/runActions";

export const getBenchmarks = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };
  loadAnalytics();
  axios
    .get(process.env.REACT_APP_SERVER_URL + "/run/getTotals", config)
    .then((res) => {
      console.log(res);
      loadAnalyticsSuccess();
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
