import base from "./base";
import axios from "./axios";

const iMaintain = {
  getReadyPlan(data) {
    return axios.get(base.api + "operation/ready-plan", {
      params: data
    });
  },
  getWeekPlan(data) {
    return axios.get(base.api + "operation/week-plan", {
      params: data
    });
  }
};

export default iMaintain;
