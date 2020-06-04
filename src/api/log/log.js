import base from "../base";
import axios from "../axios";

const log = {
  //反控日志/反控报文
  getMsgList(data) {
    return axios.get(base.api + "monitor/send17/getAllLog", {
      params: data
    });
  }
};
export default log;
