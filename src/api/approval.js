import base from "./base";
import axios from "./axios";

const approval = {
  getWaitList(data) {
    return axios.get(base.api + "approval/wait", {
      params: data
    });
  }
};

export default approval;
