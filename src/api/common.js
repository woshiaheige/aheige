import base from "./base";
import axios from "./axios";
// import qs from "qs";

const common = {
  //获取字典》》根据参数查询
  geDictByParam(data) {
    return axios.post(base.api + "sysDict/geDictByCode", data);
  },
  //站点下拉
  selectStation(data) {
    return axios.get(base.api + "cusPoint/query", {
      params: data
    });
  },
  //方案项下拉
  selectPlan(data) {
    return axios.get(base.api + "maintainProgrammeItem/query", {
      params: data
    });
  },
  //行业类别下拉
  selectIndustry(data) {
    return axios.get(base.api + "sysIndustry/query", {
      params: data
    });
  },
  //行业类别下拉
  getTreeByName(data) {
    return axios.get(base.api + "sysRegion/getTreeByName", {
      params: data
    });
  }
};

export default common;
