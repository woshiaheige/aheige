import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import routerTable from "../router/routerTable";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    includeArr: [], //缓存页面列表
    routeTable: [] //用户路由表
  },
  mutations: {
    getRouterTable(state, data) {
      state.routeTable = data; //储存路由表
    },
    getIncludeArr(state, data) {
      state.includeArr = data;
    }
  },
  actions: {
    createIncludeArr({ commit }, data) {
      sessionStorage.setItem("keepAlive", JSON.stringify(data));
      commit("getIncludeArr", data);
    },
    createRouterTable({ commit }, data) {
      sessionStorage.setItem("permission", JSON.stringify(data));
      //处理路由权限
      let allRoute = [
        {
          path: "/",
          redirect: "/index/data"
        },
        {
          path: "/",
          component: () =>
            import(/* webpackChunkName: "view-home" */ "@/views/Home.vue"),
          children: []
        }
      ];
      let toAddRoutes = [];
      data.forEach(item => {
        if (
          item.permission !== "" &&
          item.permission !== null &&
          item.permission !== undefined
        ) {
          let toAddRoute = routerTable[1].children.find(routeItem => {
            return item.permission == routeItem.key;
          });

          toAddRoutes.push(toAddRoute);
        }
      });

      routerTable[1].children.forEach(item => {
        if (item.meta.back) {
          toAddRoutes.push(item);
        }
      });

      allRoute[1].children = toAddRoutes;

      commit("getRouterTable", allRoute); //提交
      router.addRoutes(allRoute);
    }
  },
  modules: {}
});
