import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import routeTable from "../router/routerTable";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alertFlag: false,
    routeTable: [] //用户路由表
  },
  mutations: {
    getAlertFlag(state, data) {
      state.alertFlag = data;
    },
    getRouterTable(state, data) {
      state.routeTable = data; //储存路由表
    }
  },
  actions: {
    createAlertFlag({ commit }, data) {
      commit("getAlertFlag", data);
    },
    createRouterTable({ commit }, data) {
      sessionStorage.setItem("routeId", JSON.stringify(data));
      //处理路由权限
      let routerList = [];
      let dashboard = routeTable[0].children[0];
      data.forEach(item => {
        routeTable[0].children.forEach(i => {
          if (item == i.id) {
            routerList.push(i);
          }
        });
      });
      routeTable[0].children = routerList; //获得用户路由表
      console.log("routeTable", routeTable[0].children.length);
      if (routeTable[0].children.length > 0) {
        routeTable[0].children.unshift(dashboard); //添加概览
      }

      commit("getRouterTable", routeTable); //提交
      router.addRoutes(routeTable); //动态添加用户路由表
    }
  },
  modules: {}
});
