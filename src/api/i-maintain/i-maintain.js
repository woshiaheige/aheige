import base from "../base";
import axios from "../axios";

const iMaintain = {
  // //获取运维计划列表
  // maintainPlan(data) {
  //   return axios.get(base.api + "maintainPlan", {
  //     params: data
  //   });
  // },
  //获取运维计划列表
  maintainPlan(data) {
    return axios.get(base.mock + "i-maintain/ready-plan", {
      params: data
    });
  },
  //周计划任务列表
  getWeekPlan(data) {
    return axios.get(base.mock + "i-maintain/week-plan", {
      params: data
    });
  },
  //月计划任务列表
  getMonthPlan(data) {
    return axios.get(base.mock + "i-maintain/month-plan", {
      params: data
    });
  },
  //运行日志列表
  getOperationLogList(data) {
    return axios.get(base.mock + "i-maintain/operation-log", {
      params: data
    });
  },
  //报警列表
  // maintainAlert(data) {
  //   return axios.get(base.api + "maintainAlert/", {
  //     params: data
  //   });
  // },
  maintainAlert() {
    return axios.get(base.mock + "i-maintain/warning-list");
  },

  //远程控制列表
  // maintainControl(data) {
  //   return axios.get(base.api + "maintainControl/", {
  //     params: data
  //   });
  // },
  maintainControl() {
    return axios.get(base.mock + "i-maintain/remote-list");
  },
  //运维方案列表
  getSchemeList(data) {
    return axios.get(base.mock + "i-maintain/scheme-list", {
      params: data
    });
  },
  //报告列表
  // maintainTemplate(data) {
  //   return axios.get(base.api + "maintainTemplate/", {
  //     params: data
  //   });
  // },
  maintainTemplate() {
    return axios.get(base.mock + "i-maintain/template-list");
  },
  //实时动态列表
  // maintainRtd(data) {
  //   return axios.get(base.api + "maintainRtd/", {
  //     params: data
  //   });
  // },
  maintainRtd() {
    return axios.get(base.mock + "i-maintain/realtime-list");
  },

  //获取方案id
  generatedId(data) {
    return axios.get(base.api + "common/generatedId", {
      params: data
    });
  },

  //新建方案
  addMaintainProgramme(data) {
    return axios.post(
      base.api + "maintainProgramme/addMaintainProgramme",
      data
    );
  },
  //修改方案
  editMaintainProgramme(data) {
    return axios.post(
      base.api + "maintainProgramme/editMaintainProgramme",
      data
    );
  },

  //删除方案
  deleteMaintainProgramme(data) {
    return axios.post(
      base.api + "maintainProgramme/deleteMaintainProgramme",
      data
    );
  },
  //获取方案列表
  maintainProgramme(data) {
    return axios.get(base.api + "maintainProgramme/", {
      params: data
    });
  },
  //获取方案详情
  getMaintainProgrammeById(data) {
    return axios.get(base.api + "maintainProgramme/getMaintainProgrammeById", {
      params: data
    });
  },

  //获取方案项列表
  maintainProgrammeItem(data) {
    return axios.get(base.api + "maintainProgrammeItem/query", {
      params: data
    });
  },
  //新建方案项详情
  addMaintainProgrammeItem(data) {
    return axios.post(
      base.api + "maintainProgrammeItem/addMaintainProgrammeItem",
      data
    );
  },
  //删除方案项详情
  deleteMaintainProgrammeItemm(data) {
    return axios.post(
      base.api + "maintainProgrammeItem/deleteMaintainProgrammeItem",
      data
    );
  },

  //修改项目项详情
  editMaintainProgrammeItem(data) {
    return axios.post(
      base.api + "maintainProgrammeItem/editMaintainProgrammeItem",
      data
    );
  },
  //获取方案项详情
  getMaintainProgrammeItemById(data) {
    return axios.get(
      base.api + "maintainProgrammeItem/getMaintainProgrammeItemById",
      {
        params: data
      }
    );
  }
};

export default iMaintain;
