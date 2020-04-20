import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//自定义指令
import "@/directive/index";

//UI
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//progress
import VueAwesomeProgress from "vue-awesome-progress";

//自定义样式
import "@/assets/style/common.less";
import "@/assets/style/home/home.less";
import "@/assets/style/i-maintain/plan.less";
import "@/assets/style/i-maintain/scheme.less";
import "@/assets/style/i-maintain/template.less";
import "@/assets/style/maintain/maintain.less";
import "@/assets/style/index/index.less";
import "@/assets/style/index/map.less";
import "@/assets/style/organization/organization.less";
import "@/assets/style/report/daily.less";
import "@/assets/style/report/team.less";
import "@/assets/style/approval.less";
import "@/assets/style/login/login.less";

//mock
require("@/mock/index");
require("@/mock/maintain");
require("@/mock/i-maintain");
require("@/mock/customer");
require("@/mock/report");
require("@/mock/platform");
//图表
import VCharts from "v-charts";
//monent
import moment from "moment";
//懒加载
import VueLazyLoad from "vue-lazyload";
//加密
import md5 from "js-md5";

//自定义组件
import api from "@/api/index";
import base from "@/api/base";
import common from "@/assets/lib/common"; //公共Page和onSubmit
import loading from "@/assets/lib/loading";

Vue.mixin(common);
Vue.mixin(loading);

Vue.use(Antd);
Vue.use(VCharts);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: require("@/assets/img/loading.png"),
  error: require("@/assets/img/fail.png"),
  attempt: 1
});
Vue.use(VueAwesomeProgress);

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$base = base;
Vue.prototype.$moment = moment;
Vue.prototype.$md5 = md5;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
