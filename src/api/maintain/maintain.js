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
  },

  //系统平台
  getAnnouncementList(data) {
    return axios.get(base.api + "announcement/list", {
      params: data
    });
  }
};

export default maintain;
