import base from "./base";
import axios from "./axios";
import qs from "qs";

const common = {
  //获取字典》》根据参数查询
  geDictByParam(data) {
    return axios.get(base.api + "sysDict/getDictByCode", {
      params: data
    });
  },
  //数据字典》》分页查询
  sysDict(data) {
    return axios.get(base.api + "sysDict/", {
      params: data
    });
  },
  //新建字典
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

  //所有因子下拉
  selectFactor(data) {
    return axios.get(base.api + "divisor/query", {
      params: data
    });
  },
  //获取因子数组
  listByIds(data) {
    return axios.post(base.api + "divisor/listByIds", data);
  },
  //所有小组下拉
  selectGroup(data) {
    return axios.get(base.api + "sysGroup/query", {
      params: data
    });
  },
  //所有人员下拉
  selectUser(data) {
    return axios.get(base.api + "sysUser/query", {
      params: data
    });
  },
  //所有企业下拉
  selectEnterprise(data) {
    return axios.get(base.api + "cusEnterprise/query", {
      params: data
    });
  },
  //所有监控点下拉
  selectStation(data) {
    return axios.get(base.api + "cusPoint/query", {
      params: data
    });
  },
  //所有设备下拉
  selectDevice(data) {
    return axios.get(base.api + "sysInstrument/query", {
      params: data
    });
  },
  //根据企业id查询监控点下拉
  selectStationByEnterpriseId(data) {
    //传参名:enterpriseId
    return axios.get(base.api + "cusPoint/listByEnterpriseId", {
      params: data
    });
  },
  //根据监控点id查询设备下拉
  selectStationByStationId(data) {
    //传参名:cusPointId
    return axios.get(base.api + "cusPointInstrument/listByPointId", {
      params: data
    });
  },
  //根据监控点id查询因子下拉
  selectFactorByPointId(data) {
    //传参名:pointId
    return axios.get(base.api + "divisor/listAllByPointId", {
      params: data
    });
  },

  //区域树
  getTreeByName(data) {
    return axios.get(base.api + "sysRegion/getTreeByName", {
      params: data
    });
  },
  //行政区域三级
  getArea(data) {
    return axios.get(base.api + "sysRegion/getArea", {
      params: data
    });
  },
  //文件上传_1(返回一个FileVo文件对象)
  uploadFile(data) {
    return axios({
      url: base.api + "files/upload",
      method: "post",
      data: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },
  uploadFileApi: base.api + "files/upload",
  fileViewOnline: base.api + "files/view/", //在线显示文件
  fileDownload: base.api + "files/download/file/" //文件下载
};

export default common;
