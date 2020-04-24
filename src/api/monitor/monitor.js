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
  },
  //获取实时数据
  getRealData(data) {
    return axios.get(base.api + "monitor/data/", {
      params: data
    });
  },
  //获取实时数据表头
  getRealDataTitle(data, path) {
    return axios.get(base.api + "monitor/data/head/" + path, {
      params: data
    });
  },
  //获取数据报表数据
  getReportData(data) {
    return axios.get(base.api + "monitor/transmissionrate/", {
      params: data
    });
  },
  //获取异常数据
  getExData(data) {
    return axios.get(base.api + "monitor/exData/", {
      params: data
    });
  },
  //获取污染物编码列表
  getPollCodeList(data) {
    return axios.get(base.api + "divisor/listByPointId?pointId=" + data);
  }
};

export default monitor;
