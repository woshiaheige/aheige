import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alertFlag: false
  },
  mutations: {
    getAlertFlag(state, data) {
      state.alertFlag = data;
    }
  },
  actions: {
    createAlertFlag({ commit }, data) {
      commit("getAlertFlag", data);
    }
  },
  modules: {}
});
