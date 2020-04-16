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

  //获取站点列表
  getStationList(data) {
    return axios.get(base.mock + "customer/station-list", {
      params: data
    });
  },
  //获取合同列表
  // cusContract(data) {
  //   return axios.get(base.mock + "/cusContract/", {
  //     params: data
  //   });
  // }
  cusContract() {
    return axios.get(base.mock + "customer/contract-list");
  }
};

export default customer;
