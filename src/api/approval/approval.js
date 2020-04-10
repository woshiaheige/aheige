import base from "./../base";
import axios from "./../axios";

const approval = {
  getWaitList(data) {
    return axios.get(base.mock + "approval/wait", {
      params: data
    });
  }
};

export default approval;
