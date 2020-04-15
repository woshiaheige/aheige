import Vue from "vue";
import VueRouter from "vue-router";
import routeTable from "../router/routerTable";
import client from "../assets/lib/checkBrowser";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "view-login" */ "@/views/Login.vue")
  },
  {
    path: "/not-support",
    name: "notSupport",
    component: () =>
      import(
        /* webpackChunkName: "view-notSupport" */ "@/views/Not-support.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.addRoutes(routeTable);
router.beforeEach(async (to, from, next) => {
  // let token = sessionStorage.getItem("token");
  let token = 888;

  //判断是否webkit内核或IE11以上的浏览器
  if (
    client.client.engine.webkit != 0 ||
    client.client.browser.firefox != 0 ||
    client.client.browser.ie >= 11
  ) {
    if (token) {
      if (to.path == "") {
        next("/");
      } else {
        next();
      }
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    if (to.path == "/not-support") {
      next();
    } else {
      next("/not-support");
    }
  }
});

//防止路由跳转报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
