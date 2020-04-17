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
    return axios.post(base.api + "divisor/addSysDivisor", data);
  },
  //编辑因子
  editSysDivisor(data) {
    return axios.post(base.api + "divisor/editSysDivisor", data);
  },
  //删除因子
  deleteSysDivisor(data) {
    return axios.get(base.api + "divisor/deleteSysDivisor", {
      params: data
    });
  },

  //因子详情
  getSysDivisorById(data) {
    return axios.get(base.api + "divisor/getSysDivisorById", {
      params: data
    });
  },
  //设置运维参数
  updateBatchById(data) {
    return axios.post(base.api + "sysDict/updateBatchById", data);
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
  },
  //删除行业
  deleteCusEnterprise(data) {
    return axios.get(base.api + "sysIndustry/delete", {
      params: data
    });
  },

  //获取行业详情
  getCusEnterpriseById(data) {
    return axios.get(base.api + "sysIndustry/getSysIndustryById", {
      params: data
    });
  }
};
export default platform;
