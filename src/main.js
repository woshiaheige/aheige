import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//自定义指令
import "@/directive/index";

//UI
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//自定义样式
import "@/assets/style/common.less";
import "@/assets/style/home/home.less";
import "@/assets/style/i-maintain/plan.less";
import "@/assets/style/i-maintain/scheme.less";
import "@/assets/style/i-maintain/template.less";
import "@/assets/style/maintain/maintain.less";
import "@/assets/style/index/index.less";
import "@/assets/style/organization/organization.less";
import "@/assets/style/report/daily.less";
import "@/assets/style/report/team.less";
import "@/assets/style/approval.less";

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

//自定义组件
import api from "@/api/index";
import base from "@/api/base";
import common from "@/assets/lib/common"; //公共Page和onSubmit

Vue.mixin(common);

Vue.use(Antd);
Vue.use(VCharts);

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$base = base;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
