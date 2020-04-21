import base from "../base";
import axios from "../axios";

const maintain = {
  //任务一览
  getManageTaskList(data) {
    return axios.get(base.api + "manageTask/", {
      params: data
    });
  },
  addManageTask(data) {
    return axios.post(base.api + "manageTask/addManageTask", data);
  },
  //站点任务管理
  getManagePointTaskList(data) {
    return axios.get(base.api + "managePointTask", {
      params: data
    });
  },
  //mock
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
  },
  //方案
  getScheme() {
    return axios.get(base.api + "/maintainProgramme/query");
  }
};

export default maintain;
