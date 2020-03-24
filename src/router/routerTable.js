import indexRoutes from "../router/routesTable/indexRoute";
import maintainRoutes from "../router/routesTable/maintainRoute";

const RouterTable = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "view-home" */ "@/views/Home.vue"),
    children: [...indexRoutes, ...maintainRoutes]
  }
];

export default RouterTable;
