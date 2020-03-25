import indexRoutes from "../router/routesTable/indexRoute";
import maintainRoutes from "../router/routesTable/maintainRoute";
import iMaintainRoutes from "../router/routesTable/iMaintainRoute";
import customerRoutes from "../router/routesTable/customerRoute";
const RouterTable = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "view-home" */ "@/views/Home.vue"),
    children: [...indexRoutes, ...maintainRoutes,...iMaintainRoutes,...customerRoutes]
  }
];

export default RouterTable;
