import base from "../base";
import axios from "../axios";

const login = {
  login(data) {
    return axios.post(base.api + "user/login/", data);
  }
};

export default login;
