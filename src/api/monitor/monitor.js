import base from "../base";
import axios from "../axios";

const monitor = {
  //获取监测数据
  getStandingData(data) {
    return axios.get(base.api + "monitor/data/enterpriseData", {
      params: data
    });
  },
  //获取超标数据
  getWarnData(data) {
    return axios.get(base.api + "monitor/warnData/", {
      params: data
    });
  },
  //获取实时数据
  getRealData(data) {
    return axios.get(base.api + "monitor/data/", {
      params: data
    });
  },
  //获取实时数据表头
  getRealDataTitle(data, path) {
    return axios.get(base.api + "monitor/data/head/" + path, {
      params: data
    });
  },
  //获取数据报表数据
  getReportData(data) {
    return axios.get(base.api + "monitor/transmissionrate/", {
      params: data
    });
  },
  //获取异常数据
  getExData(data) {
    return axios.get(base.api + "monitor/exData/", {
      params: data
    });
  },
  //获取污染物编码列表
  getPollCodeList(data) {
    return axios.get(base.api + "divisor/listByPointId", {
      params: data
    });
  },
  //提取现场机
  getSend1011(data) {
    return axios.get(base.api + "monitor/send17/send1011", {
      params: data
    });
  },
  //设置现场机时间 1012
  getSend1012(data) {
    return axios.get(base.api + "monitor/send17/send1012", {
      params: data
    });
  },
  //提取污染物历史数据 2051
  getReissue(data) {
    return axios.get(base.api + "monitor/send17/reissue", {
      params: data
    });
  },
  //设置即时采样 3012
  getSend3012(data) {
    return axios.get(base.api + "monitor/send17/send3012", {
      params: data
    });
  },
  //设置启动清洗 3013
  getSend3013(data) {
    return axios.get(base.api + "monitor/send17/send3013", {
      params: data
    });
  },
  //设置超标留样 3015
  getSend3015(data) {
    return axios.get(base.api + "monitor/send17/send3015", {
      params: data
    });
  },
  //设置采样时间周期 3016
  getSend3016(data) {
    return axios.get(base.api + "monitor/send17/send3016", {
      params: data
    });
  },
  //提取采样时间周期 3017
  getSend3017(data) {
    return axios.get(base.api + "monitor/send17/send3017", {
      params: data
    });
  },
  //查询污染物历史数据反控结果
  getLogByQn(qn) {
    return axios.get(base.api + "monitor/send17/getLogByQn/" + qn);
  },
  //查询反控结果
  getResultByQn(data) {
    return axios.get(base.api + "monitor/send17/getResultByQn/", {
      params: data
    });
  },
  //获取零值数据列表
  getZeroData(data) {
    return axios.get(base.api + "monitor/zeroData/", {
      params: data
    });
  },
  //获取恒值数据列表
  getConstantData(data) {
    return axios.get(base.api + "monitor/constantData/", {
      params: data
    });
  },
  // 报表监测数据导出
  getExportmonitor(data) {
    return axios.get(base.api + "monitor/data/export", {
      params: data
    });
  }
};

export default monitor;
