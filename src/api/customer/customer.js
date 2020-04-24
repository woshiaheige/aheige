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
    return axios.get(base.api + "cusEnterprise/deleteCusEnterprise", {
      params: data
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
    return axios.get(base.api + "cusPoint/deleteCusPoint", {
      params: data
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
    return axios.get(base.api + "cusPointDivisor/delete", {
      params: data
    });
  },
  getFactorById(data) {
    return axios.get(base.api + "cusPointDivisor/getCusPointDivisorById", {
      params: data
    });
  },
  //根据监测点获取设备列表
  getDeviceListByPointId(data) {
    return axios.get(base.api + "cusPointInstrument/pageByPointId", {
      params: data
    });
  },
  addDeviceByPointId(data) {
    return axios.post(
      base.api + "cusPointInstrument/addCusPointInstrument",
      data
    );
  },
  editDeviceByPointId(data) {
    return axios.post(
      base.api + "cusPointInstrument/editCusPointInstrument",
      data
    );
  },
  delDeviceByPointId(data) {
    return axios.get(base.api + "cusPointInstrument/deleteCusPointInstrument", {
      params: data
    });
  },
  getDeviceByPointId(data) {
    return axios.get(
      base.api + "cusPointInstrument/getCusPointInstrumentById",
      {
        params: data
      }
    );
  },
  //根据监测点获取设备下拉
  selectDeviceByPointId(data) {
    return axios.get(base.api + "cusPointInstrument/query", {
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
    return axios.get(base.api + "sysInstrument/deleteSysInstrument", {
      params: data
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
    return axios.get(base.api + "contract/deleteContract", {
      params: data
    });
  },
  getContractById(data) {
    return axios.get(base.api + "contract/getCusContractById", {
      params: data
    });
  },
  //获取企业用户列表
  getEnterpriseList(data) {
    return axios.get(base.api + "sysEnterpriseUser/", {
      params: data
    });
  },
  addEnterprise(data) {
    return axios.post(
      base.api + "sysEnterpriseUser/addSysEnterpriseUser",
      data
    );
  },
  editEnterprise(data) {
    return axios.post(
      base.api + "sysEnterpriseUser/editSysEnterpriseUser",
      data
    );
  },
  delEnterprise(data) {
    return axios.get(base.api + "sysEnterpriseUser/deleteSysEnterpriseUser", {
      params: data
    });
  },
  getEnterpriseById(data) {
    return axios.get(base.api + "sysEnterpriseUser/getSysEnterpriseUserById", {
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
