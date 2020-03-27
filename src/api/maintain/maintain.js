import base from "../base";
import axios from "../axios";

const maintain = {
  getMissionList(data) {
    return axios.get(base.api + "mission/list", {
      params: data
    });
  }
};

export default maintain;
