import base from "../base";
import axios from "../axios";

const maintain = {
  getMissionList(data) {
    return axios.get(base.api + "mission/list", {
      params: data
    });
  },
  getCarList(data) {
    return axios.get(base.api + "car/list", {
      params: data
    });
  },
  getViolationList(data) {
    return axios.get(base.api + "violation/list", {
      params: data
    });
  }
};

export default maintain;
