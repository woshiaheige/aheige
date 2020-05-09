import base from "../base";
import axios from "../axios";

const cost = {
  //列表
  getCostList(data) {
    return axios.get(base.api + "assetStock/queryPageCostManagement", {
      params: data
    });
  },
  //查询成本曲线图
  getChartLine(data) {
    return axios.get(base.api + "assetStock/countCostCurve", {
      params: data
    });
  },
  //查询成本饼状图
  getChartPie(data) {
    return axios.get(base.api + "assetStock/countCostMap", {
      params: data
    });
  }
};

export default cost;
