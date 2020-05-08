import base from "./../base";
import axios from "./../axios";

const assessment = {
  //月度考核列表
  getMonthlyAssessment(data) {
    return axios.get(base.api + "evaluation/months", {
      params: data
    });
  },
  //月度考评标题
  getMonthlyTitle(data) {
    return axios.get(base.api + "evaluation/monthTitles", {
      params: data
    });
  },
  //年度考评列表
  getYearlyAssessment(data) {
    return axios.get(base.api + "evaluation/years", {
      params: data
    });
  },
  //年度考评标题
  getYearlyTitle(data) {
    return axios.get(base.api + "evaluation/yearTitles", {
      params: data
    });
  },
  //季度考评列表
  getSeasonAssessment(data) {
    return axios.get(base.api + "evaluation/quarters", {
      params: data
    });
  },
  //季度考评标题
  getSeasonTitle(data) {
    return axios.get(base.api + "evaluation/quarterTitles", {
      params: data
    });
  },
  //考评详情
  getAssessmentDetail(data) {
    return axios.get(base.api + "evaluation/getDetail", {
      params: data
    });
  }
};

export default assessment;
