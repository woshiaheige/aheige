import indexRoutes from "../router/routesTable/indexRoute";
import maintainRoutes from "../router/routesTable/maintainRoute";
import iMaintainRoutes from "../router/routesTable/iMaintainRoute";
import customerRoutes from "../router/routesTable/customerRoute";
import approvalRoute from "../router/routesTable/approvalRoute";
import workbenchRoute from "../router/routesTable/workbenchRoute";
import standingRoute from "../router/routesTable/standingRoute";

const RouterTable = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "view-home" */ "@/views/Home.vue"),
    children: [
      ...indexRoutes,
      ...maintainRoutes,
      ...approvalRoute,
      ...iMaintainRoutes,
      ...customerRoutes,
      ...workbenchRoute,
      ...standingRoute
    ]
  }
];

export default RouterTable;
