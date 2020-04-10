import base from "../base";
import axios from "../axios";

const customer = {
  //获取一企一档列表
  // getEnterPriseList(data) {
  //   return axios.get(base.mock + "cusEnterprise/", {
  //     params: data
  //   });
  // },
  getEnterPriseList() {
    return axios.get(base.mock + "customer/enterprise-list");
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
