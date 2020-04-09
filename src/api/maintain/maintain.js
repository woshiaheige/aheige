import base from "../base";
import axios from "../axios";

const maintain = {
  getMissionList(data) {
    return axios.get(base.mock + "mission/list", {
      params: data
    });
  },
  getCarList(data) {
    return axios.get(base.mock + "car/list", {
      params: data
    });
  },
  getViolationList(data) {
    return axios.get(base.mock + "violation/list", {
      params: data
    });
  },

  //系统平台
  getAnnouncementList(data) {
    return axios.get(base.mock + "announcement/list", {
      params: data
    });
  },

  //部门管理列表
  getDepartmentList(data) {
    return axios.get(base.mock + "department/list", {
      params: data
    });
  },

  //成员管理列表
  getMemberList(data) {
    return axios.get(base.mock + "member/list", {
      params: data
    });
  }
};

export default maintain;
