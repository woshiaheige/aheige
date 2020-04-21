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
  //方案
  getScheme() {
    return axios.get(base.api + "/maintainProgramme/query");
  },
  addScheme(data) {
    return axios.post(
      base.api + "/maintainProgramme/addMaintainProgramme",
      data
    );
  }
};

export default maintain;
