import base from "../base";
import axios from "../axios";

const login = {
  login(data) {
    return axios.post(base.api + "login/", data);
  },
  //获取权限
  getResource() {
    return axios.get(base.api + "sysResource/queryUserResource");
  }
};

export default login;
