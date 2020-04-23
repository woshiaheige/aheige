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
  },
  //客户投诉详情
  getComplaintById(data) {
    return axios.get(base.api + "manageComplaint/getManageComplaintById", {
      params: data
    });
  },
  //合同提醒详情
  getContractById(data) {
    return axios.get(base.api + "contract/getCusContractById", {
      params: data
    });
  },
  //站点报警详情
  getPointById(data) {
    return axios.get(base.api + "divisor/warns/", {
      params: data
    });
  },
  //关闭报警
  closeMsg(data) {
    return axios.post(base.api + "sysMsg/editSysMsg", data);
  }
};

export default index;
