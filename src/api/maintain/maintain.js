import base from "../base";
import axios from "../axios";

const maintain = {
  //任务一览
  getManageTaskList(data) {
    return axios.get(base.api + "manageTask/", {
      params: data
    });
  },
  //获取统计任务数
  getCountTask(data) {
    return axios.get(base.api + "manageTask/countTask", {
      params: data
    });
  },
  addManageTask(data) {
    return axios.post(base.api + "manageTask/addManageTask", data);
  },
  //修改突发任务
  editManageTask(data) {
    return axios.post(base.api + "manageTask/editManageTask", data);
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
  //知识库分类
  knowledgeClass() {
    return axios.get(base.api + "knowledgeClass/query");
  },
  //新增知识库分类
  addKnowledgeClass(data) {
    return axios.post(base.api + "knowledgeClass/addKnowledgeClass", data);
  },
  //获取知识库分类
  getClassById(data) {
    return axios.get(base.api + "knowledgeClass/getClassById", {
      params: data
    });
  },
  //修改知识库分类
  updateKnowledgeClass(data) {
    return axios.post(base.api + "knowledgeClass/update", data);
  },
  //删除知识库分类
  deleteKnowledgeClass(data) {
    return axios.get(base.api + "knowledgeClass/delete", {
      params: data
    });
  },
  //新增文章
  addKnowledgeArticle(data) {
    return axios.post(base.api + "article/addKnowledgeArticle", data);
  },
  //编辑文章
  updateKnowledgeArticle(data) {
    return axios.post(base.api + "article/update", data);
  },
  //删除文章
  deleteKnowledgeArticle(data) {
    return axios.get(base.api + "article/delete", {
      params: data
    });
  },
  //文章列表
  article(data) {
    return axios.get(base.api + "article/", {
      params: data
    });
  },
  //文章详情
  getArticleById(data) {
    return axios.get(base.api + "article/getArticleById", {
      params: data
    });
  },
  //客户投诉列
  getManageComplaintsPage(data) {
    return axios.get(base.api + "manageComplaint/getManageComplaintsPage/", {
      params: data
    });
  },
  //投诉详情
  getManageComplaintById(data) {
    return axios.get(base.api + "manageComplaint/getManageComplaintById", {
      params: data
    });
  },
  //投诉处理
  editManageComplaint(data) {
    return axios.post(base.api + "manageComplaint/editManageComplaint", data);
  },
  //方案
  getScheme(data) {
    return axios.get(base.api + "maintainProgramme/query", { params: data });
  },
  //新增方案
  addScheme(data) {
    return axios.post(
      base.api + "maintainProgramme/addMaintainProgramme",
      data
    );
  },
  //修改方案
  editScheme(data) {
    return axios.post(
      base.api + "maintainProgramme/editMaintainProgramme",
      data
    );
  },
  //删除方案
  deleteScheme(data) {
    return axios.get(base.api + "maintainProgramme/deleteMaintainProgramme", {
      params: data
    });
  },
  //方案项
  getSchemeList(data) {
    return axios.get(base.api + "maintainProgrammeItem/", { params: data });
  },
  //添加方案项
  addSchemeList(data) {
    return axios.post(
      base.api + "maintainProgrammeItem/addMaintainProgrammeItem",
      data
    );
  },
  //任务管理列表
  managePointTask(data) {
    return axios.get(base.api + "managePointTask/", { params: data });
  },

  //任务项详情
  getManageTaskById(data) {
    return axios.get(base.api + "manageTask/getManageTaskById", {
      params: data
    });
  },
  //修改方案项
  editSchemeList(data) {
    return axios.post(
      base.api + "maintainProgrammeItem/editMaintainProgrammeItem",
      data
    );
  },
  //删除方案项
  deleteSchemeList(data) {
    return axios.get(base.api + "maintainProgrammeItem/deleteProgrammeItem", {
      params: data
    });
  },
  //计划站点
  getPlanStation(data) {
    return axios.get(base.api + "maintainPlanPoint/query", {
      params: data
    });
  },
  //配置方案
  addPlan(data) {
    return axios.post(base.api + "maintainPlanPoint/addPlanPoints", data);
  },
  //获取计划
  getPlan(data) {
    return axios.get(base.api + "maintainPlanPoint/getPlanPointPage/", {
      params: data
    });
  },
  //删除计划
  deletePlan(data) {
    return axios.get(base.api + "maintainPlanPoint/deletePlanPoint", {
      params: data
    });
  },
  //编辑计划
  editPlan(data) {
    return axios.post(
      base.api + "maintainPlanPoint/editMaintainPlanPoint",
      data
    );
  },
  //获取日计划看板
  getMonthPlanBoard(data) {
    return axios.get(base.api + "plan/board/getMonthPlanBoard", {
      params: data
    });
  },
  //获取日计划详情
  getMonthPlanBoardData(data) {
    return axios.get(base.api + "plan/board/getMonthPlanBoardData", {
      params: data
    });
  },
  //获取月份计划详情
  getCountPlanTask(data) {
    return axios.get(base.api + "plan/board/getCountPlanTask", {
      params: data
    });
  },
  //报表推送列表
  reportPush(data) {
    return axios.get(base.api + "reportPush/", {
      params: data
    });
  },
  //获取报表详情
  getReportPushDetails(data) {
    return axios.get(base.api + "reportPushDetails/getReportPushDetails", {
      params: data
    });
  },
  //查询数据率统计详情
  getReportPushDataRateDetails(data) {
    return axios.get(
      base.api + "reportPushDetails/getReportPushDataRateDetails",
      {
        params: data
      }
    );
  },
  //根据站点获取季度/月/周的异常数据
  getReportPushDataRateExData(data) {
    return axios.get(
      base.api + "reportPushDetails/getReportPushDataRateExData",
      {
        params: data
      }
    );
  },
  //根据站点获取季度/月/周的超标数据
  getReportPushDataRateWarnData(data) {
    return axios.get(
      base.api + "reportPushDetails/getReportPushDataRateWarnData",
      {
        params: data
      }
    );
  },
  //本周任务
  getMissionThisWeek(data) {
    return axios.get(base.api + "dispatch/getList", { params: data });
  },
  //下周任务
  getMissionNextWeek(data) {
    return axios.get(base.api + "dispatch/getNextWeekTask", {
      params: data
    });
  },
  //任务调度
  missionDispatch(data) {
    return axios.get(base.api + "dispatch/", { params: data });
  },
  // 根据报表推送id查询设备数据列表
  getAllReportPushInstrumentData(data) {
    return axios.get(
      base.api + "reportPushInstrumentData/getAllReportPushInstrumentData",
      { params: data }
    );
  },
  //根据报表推送id查询设备故障数据列表
  getAllReportPushInstrumentDataEx(data) {
    return axios.get(
      base.api + "reportPushInstrumentData/getAllReportPushInstrumentDataEx",
      { params: data }
    );
  },
  //根据报表推送id查询统计设备数、设备故障数、故障百分比
  getCount(data) {
    return axios.get(base.api + "reportPushInstrumentData/getCount", {
      params: data
    });
  },

  //根据站点获取季度/月/周的超标、异常曲线图数据
  getReportPushDataRateWarnAndOverProofCurve(data) {
    return axios.get(
      base.api + "reportPushDetails/getReportPushDataRateWarnAndOverProofCurve",
      {
        params: data
      }
    );
  },
  //根据reportPushId查询任务曲线图数据
  getReportPushDetailsCurve(data) {
    return axios.get(base.api + "reportPushDetails/getReportPushDetailsCurve", {
      params: data
    });
  },
  //根据reportPushId查询统计任务数，和方案
  getReportPushTaskCount(data) {
    return axios.get(base.api + "reportPushDetails/getReportPushTaskCount", {
      params: data
    });
  }
};

export default maintain;
