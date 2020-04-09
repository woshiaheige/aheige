import base from "../base";
import axios from "../axios";

const iMaintain = {
  //未计划任务列表
  getReadyPlan(data) {
    return axios.get(base.api + "i-maintain/ready-plan", {
      params: data
    });
  },
  //周计划任务列表
  getWeekPlan(data) {
    return axios.get(base.api + "i-maintain/week-plan", {
      params: data
    });
  },
  //运行日志列表
  getOperationLogList(data) {
    return axios.get(base.api + "i-maintain/operation-log", {
      params: data
    });
  },
  //报警列表
  getWarningList(data) {
    return axios.get(base.api + "i-maintain/warning-list", {
      params: data
    });
  },
  //远程控制列表
  getRemoteList(data) {
    return axios.get(base.api + "i-maintain/remote-list", {
      params: data
    });
  },
  //运维方案列表
  getSchemeList(data) {
    return axios.get(base.api + "i-maintain/scheme-list", {
      params: data
    });
  },
  //报告列表
  getTemplateList(data) {
    return axios.get(base.api + "i-maintain/template-list", {
      params: data
    });
  },
  //实时动态列表
  getRealtimeList(data) {
    return axios.get(base.api + "i-maintain/realtime-list", {
      params: data
    });
  },
  //新增方案
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

  //删除方案项
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
  //新增方案项详情
  addMaintainProgrammeItem(data) {
    return axios.post(
      base.api + "maintainProgrammeItem/addMaintainProgrammeItem",
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
