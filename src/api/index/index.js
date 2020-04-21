import base from "../base";
import axios from "../axios";

const index = {
  //运维统计
  getStatistics(data) {
    return axios.get(base.api + "operation/monitor/statistics", {
      params: data
    });
  },
  //任务排行top10
  taskRanking(data) {
    return axios.get(base.api + "operation/monitor/taskRanking", {
      params: data
    });
  },
  //任务完成情况
  taskCount(data) {
    return axios.get(base.api + "operation/monitor/taskCompletionCount", {
      params: data
    });
  },
  //小组任务完成情况
  completion(data) {
    return axios.get(base.api + "operation/monitor/taskCompletion", {
      params: data
    });
  },
  //消息提醒列表
  reminds(data) {
    return axios.get(base.api + "operation/monitor/reminds", {
      params: data
    });
  }
};

export default index;
