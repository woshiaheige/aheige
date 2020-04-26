import Vue from "vue";
import VueRouter from "vue-router";
import client from "../assets/lib/checkBrowser";
// import routerTable from "./../router/routerTable";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "view-login" */ "@/views/Login.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "view-404" */ "@/views/404.vue")
  },
  {
    path: "/not-support",
    name: "notSupport",
    component: () =>
      import(
        /* webpackChunkName: "view-notSupport" */ "@/views/Not-support.vue"
      )
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.addRoutes(routerTable);

router.beforeEach(async (to, from, next) => {
  let token = sessionStorage.getItem("token");

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
