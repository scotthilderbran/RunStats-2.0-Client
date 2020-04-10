import { CHANGE_AVG_VIEW } from "./constants";
import axios from "axios";

export function changeAvgView(data) {
  return {
    type: CHANGE_AVG_VIEW,
    payload: data,
  };
}
