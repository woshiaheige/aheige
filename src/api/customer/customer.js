import base from "../base";
import axios from "../axios";

const customer = {
  //获取一企一档列表
  getEnterPriseList(data) {
    return axios.get(base.api + "customer/enterprise-list", {
      params: data
    });
  },
  //获取站点列表
  getStationList(data) {
    return axios.get(base.api + "customer/station-list", {
      params: data
    });
  },
  //获取合同列表
  getContractList(data) {
    return axios.get(base.api + "customer/contract-list", {
      params: data
    });
  }
};

export default customer;
