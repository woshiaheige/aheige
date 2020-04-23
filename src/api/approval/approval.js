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
  //我的审批统计
  getApprovalCount(data) {
    return axios.get(base.api + "approvalProcess/approvalCount", {
      params: data
    });
  }
};

export default approval;
