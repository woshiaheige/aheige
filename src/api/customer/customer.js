import base from "../base";
import axios from "../axios";

const customer = {
  //获取企业信息列表
  getEnterPriseList(data) {
    return axios.get(base.api + "cusEnterprise/", {
      params: data
    });
  },
  addEnterPrise(data) {
    return axios.post(base.api + "cusEnterprise/addCusEnterprise", data);
  },
  editEnterPrise(data) {
    return axios.post(base.api + "cusEnterprise/editCusEnterprise", data);
  },

  delEnterPrise(data) {
    return axios({
      url: base.api + "cusEnterprise/deleteCusEnterprise",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      transformRequest: [
        data => {
          let params = "";
          for (var index in data) {
            params += index + "=" + data[index] + "&";
          }
          return params;
        }
      ]
    });
  },
  getEnterPriseById(data) {
    return axios.get(base.api + "cusEnterprise/getCusEnterpriseById", {
      params: data
    });
  },

  //获取站点列表
  getStationList(data) {
    return axios.get(base.api + "cusPoint/", {
      params: data
    });
  },
  addStation(data) {
    return axios.post(base.api + "cusPoint/addCusPoint", data);
  },
  editStation(data) {
    return axios.post(base.api + "cusPoint/editCusPoint", data);
  },
  delStation(data) {
    return axios({
      url: base.api + "cusPoint/deleteCusPoint",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      transformRequest: [
        data => {
          let params = "";
          for (var index in data) {
            params += index + "=" + data[index] + "&";
          }
          return params;
        }
      ]
    });
  },
  getStationById(data) {
    return axios.get(base.api + "cusPoint/getCusPointById", {
      params: data
    });
  },
  //获取因子列表
  getFactorList(data) {
    return axios.get(base.api + "cusPointDivisor/", {
      params: data
    });
  },
  addFactor(data) {
    return axios.post(base.api + "cusPointDivisor/addCusPointDivisor", data);
  },
  editFactor(data) {
    return axios.post(base.api + "cusPointDivisor/update", data);
  },
  delFactor(data) {
    return axios({
      url: base.api + "cusPointDivisor/delete",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      transformRequest: [
        data => {
          let params = "";
          for (var index in data) {
            params += index + "=" + data[index] + "&";
          }
          return params;
        }
      ]
    });
  },
  getFactorById(data) {
    return axios.get(base.api + "cusPointDivisor/getCusPointDivisorById", {
      params: data
    });
  },
  //获取设备列表
  getDeviceList(data) {
    return axios.get(base.api + "sysInstrument/", {
      params: data
    });
  },
  addDevice(data) {
    return axios.post(base.api + "sysInstrument/addSysInstrument", data);
  },
  editDevice(data) {
    return axios.post(base.api + "sysInstrument/editSysInstrument", data);
  },
  delDevice(data) {
    return axios({
      url: base.api + "sysInstrument/deleteSysInstrument",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      transformRequest: [
        data => {
          let params = "";
          for (var index in data) {
            params += index + "=" + data[index] + "&";
          }
          return params;
        }
      ]
    });
  },
  getDeviceById(data) {
    return axios.get(base.api + "sysInstrument/getSysInstrumentById", {
      params: data
    });
  },
  //获取合同列表
  getContractList(data) {
    return axios.get(base.api + "contract/", {
      params: data
    });
  },
  addContract(data) {
    return axios.post(base.api + "contract/addCusContract", data);
  },
  editContract(data) {
    return axios.post(base.api + "contract/editCusContract", data);
  },
  delContract(data) {
    return axios({
      url: base.api + "contract/deleteContract",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      transformRequest: [
        data => {
          let params = "";
          for (var index in data) {
            params += index + "=" + data[index] + "&";
          }
          return params;
        }
      ]
    });
  },
  getContractById(data) {
    return axios.get(base.api + "contract/getCusContractById", {
      params: data
    });
  },
  //上传文件
  uploadFile(data) {
    return axios.post(base.api + "files/uploadFile", data);
  },
  //下载文件
  downloadFile(data) {
    return axios.get(base.api + "files/download/file/" + data.id);
  }
};

export default customer;
