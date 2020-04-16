import base from "../base";
import axios from "../axios";

const organization = {
  //获取监测数据
  getStandingData(data) {
    return axios.get(base.api + "organization/data/enterpriseData", {
      params: data
    });
  },
  //获取超标数据
  getWarnData(data) {
    return axios.get(base.api + "organization/warnData/", {
      params: data
    });
  }
};

export default organization;
