import base from "../base";
import axios from "../axios";

const report = {
  //获取仪器汇总列表
  getDeviceList(data) {
    return axios.get(base.api + "report/device-list", {
      params: data
    });
  },
  //获取小组汇总列表
  getTeamList(data) {
    return axios.get(base.api + "report/team-list", {
      params: data
    });
  }
};

export default report;
