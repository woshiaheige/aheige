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
    return axios.get(base.api + "divisor/", {
      params: data
    });
  },
  //新增因子
  addSysDivisor(data) {
    return axios.post(base.api + "sysDivisor/addSysDivisor", data);
  },
  //编辑因子
  editSysDivisor(data) {
    return axios.post(base.api + "divisor/editSysDivisor", data);
  },

  //因子详情
  getSysDivisorById(data) {
    return axios.get(base.api + "divisor/getSysDivisorById", {
      params: data
    });
  },
  //设置运维参数
  editSysParameter(data) {
    return axios.post(base.api + "sysParameter/editSysParameter", data);
  },

  //行业列表
  sysIndustry(data) {
    return axios.get(base.api + "sysIndustry/", {
      params: data
    });
  },
  //新增行业
  addSysIndustry(data) {
    return axios.post(base.api + "sysIndustry/addSysIndustry", data);
  },
  //修改行业
  updateSysIndustry(data) {
    return axios.post(base.api + "sysIndustry/update", data);
  }
};
export default platform;
