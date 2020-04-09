import base from "../base";
import axios from "../axios";

const customer = {
  //获取一企一档列表
  getEnterPriseList(data) {
    return axios.get(base.api + "cusEnterprise/", {
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
  cusContract(data) {
    return axios.get(base.api + "/cusContract/", {
      params: data
    });
  }
};

export default customer;
