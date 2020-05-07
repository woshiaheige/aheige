import base from "../base";
import axios from "../axios";

const cost = {
  getCostList(data) {
    return axios.get(base.api + "assetStock/queryPageCostManagement", {
      params: data
    });
  }
};

export default cost;
