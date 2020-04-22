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
  //知识库分类
  knowledgeClass(data) {
    return axios.get(base.api + "knowledgeClass/", {
      params: data
    });
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
    return axios.post(base.api + "maintainPlan/addMaintainPlan", data);
  },
  //获取计划
  getPlan(data) {
    return axios.get(base.api + "maintainPlan/", { params: data });
  },
  deletePlan(data) {
    return axios.get(base.api + "maintainPlan/deleteMaintainPlan", {
      params: data
    });
  }
};

export default maintain;
