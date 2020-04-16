import base from "../base";
import axios from "../axios";

const monitor = {
  //获取监测数据
  getStandingData(data) {
    return axios.get(base.api + "monitor/data/enterpriseData", {
      params: data
    });
  },
  //获取超标数据
  getWarnData(data) {
    return axios.get(base.api + "monitor/warnData/", {
      params: data
    });
  }
};

export default monitor;
