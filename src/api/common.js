import base from "./base";
import axios from "./axios";
// import qs from "qs";

const common = {
  //获取字典》》根据参数查询
  geDictByParam(data) {
    return axios.post(base.api + "sysDict/geDictByCode", data);
  },
  //获取站点下拉
  selectStation(data) {
    return axios.get(base.api + "cusPoint/query", {
      params: data
    });
  },
  //获取方案项下拉
  selectPlan(data) {
    return axios.get(base.api + "maintainProgrammeItem/query", {
      params: data
    });
  }
};

export default common;
