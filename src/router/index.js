import Vue from "vue";
import VueRouter from "vue-router";
import routeTable from "../router/routerTable";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.addRoutes(routeTable);

//防止路由跳转报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
