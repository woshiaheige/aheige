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
  },
  //成本管理-根据成本类型统计饼状图数据
  getTypeChartPie(data) {
    return axios.get(base.api + "assetStock/countTypeCostMap", {
      params: data
    });
  },
  //成本管理-根据成本类型统计曲线图数据
  getTypeChartLine(data) {
    return axios.get(base.api + "assetStock/countTypeCostTrendCurveMap", {
      params: data
    });
  },
  //根据type查询物品下拉
  getGoodsByType(data) {
    return axios.get(base.api + "assetGoods/queryTypeAll", {
      params: data
    });
  }
};

export default cost;
