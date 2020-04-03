import base from "../base";
import axios from "../axios";

const platform = {
  //仪器型号设置列表
  getInstrumentList(data) {
    return axios.get(base.api + "i-maintain/instrument-list", {
      params: data
    });
  },
  //监测因子一览表列表
  getFactorsList(data) {
    return axios.get(base.api + "i-maintain/factors-list", {
      params: data
    });
  }
};
export default platform;
