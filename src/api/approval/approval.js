import base from "./../base";
import axios from "./../axios";

const approval = {
  getWaitList(data) {
    return axios.get(base.api + "approvalProcess/myTodoList", {
      params: data
    });
  }
};

export default approval;
