import base from "./base";
import axios from "./axios";
// import qs from "qs";

const common = {
  //获取字典》》根据参数查询
  geDictByParam(data) {
    return axios.post(base.api + "/sysDict/geDictByParam", data);
  }
};

export default common;
