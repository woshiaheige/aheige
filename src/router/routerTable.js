import indexRoutes from "../router/routesTable/indexRoute";
import maintainRoutes from "../router/routesTable/maintainRoute";
import approvalRoute from "../router/routesTable/approvalRoute";

const RouterTable = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "view-home" */ "@/views/Home.vue"),
    children: [...indexRoutes, ...maintainRoutes, ...approvalRoute]
  }
];

export default RouterTable;
