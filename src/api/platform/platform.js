import base from "../base";
import axios from "../axios";

const platform = {
  //仪器型号设置列表
  getInstrumentList(data) {
    return axios.get(base.api + "i-maintain/instrument-list", {
      params: data
    });
  },
  //因子设置列表
  sysDivisor(data) {
    return axios.get(base.api + "sysDivisor/", {
      params: data
    });
  },
  //新增因子
  addSysDivisor(data) {
    return axios.post(base.api + "sysDivisor/addSysDivisor", data);
  },
  //获取因子详情
  getSysDivisorById(data) {
    return axios.post(base.api + "sysDivisor/getSysDivisorById", data);
  }
};
export default platform;
