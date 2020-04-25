import base from "./../base";
import axios from "./../axios";

const approval = {
  getWaitList(data) {
    return axios.get(base.mock + "approval/wait", {
      params: data
    });
  },
  //我的审批列表
  getMyApprovalList(data) {
    return axios.get(base.api + "approvalProcess/initProcessByMine", {
      params: data
    });
  },
  //审核审批列表
  getApprovalList(data) {
    return axios.get(base.api + "approvalProcess/approvalList", {
      params: data
    });
  },
  //审批统计
  getApprovalCount(data) {
    return axios.get(base.api + "approvalProcess/approvalCount", {
      params: data
    });
  },
  //获取任务详情
  getTaskInfo(data) {
    return axios.get(base.api + "approvalProcess/taskInfo", {
      params: data
    });
  },
  //任务审批
  getApprovalTask(data) {
    return axios.post(base.api + "approvalProcess/approvalTask", data);
  }
};

export default approval;
