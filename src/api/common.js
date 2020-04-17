import base from "./base";
import axios from "./axios";
// import qs from "qs";

const common = {
  //获取字典》》根据参数查询
  geDictByParam(data) {
    return axios.post(base.api + "sysDict/geDictByCode", data);
  },
  //数据字典》》分页查询
  sysDict(data) {
    return axios.get(base.api + "sysDict/", {
      params: data
    });
  },
  //新增字典
  addSysDict(data) {
    return axios.post(base.api + "sysDict/addSysDict", data);
  },
  //通过id获取字典
  getSysDictById(data) {
    return axios.get(base.api + "sysDict/getSysDictById", {
      params: data
    });
  },
  //删除字典
  deleteSysDict(data) {
    return axios.get(base.api + "sysDict/deleteSysDict", {
      params: data
    });
  },

  //修改字典
  editSysDict(data) {
    return axios.post(base.api + "sysDict/editSysDict", data);
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
  //所有企业下拉
  selectEnterprise(data) {
    return axios.get(base.api + "/cusEnterprise/query", {
      params: data
    });
  },
  //区域树
  getTreeByName(data) {
    return axios.get(base.api + "sysRegion/getTreeByName", {
      params: data
    });
  }
};

export default common;
