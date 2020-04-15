import reportRoute from "../router/routesTable/reportRoute";
// import announcement from "../router/routesTable/announcement";
// import iMaintainRoutes from "../router/routesTable/iMaintainRoute";
import indexRoutes from "../router/routesTable/indexRoute"; //运维一览
import approvalRoute from "../router/routesTable/approvalRoute"; //审批管理
import maintainRoutes from "../router/routesTable/maintainRoute"; //运维管理
import customerRoutes from "../router/routesTable/customerRoute"; //客户管理
import carRoute from "../router/routesTable/carRoute"; //车辆管理
import productRoute from "../router/routesTable/productRoute"; //物品管理
import organization from "../router/routesTable/organization"; //人员管理
import platform from "../router/routesTable/platform"; //平台设置

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
      ...reportRoute,
      // ...announcement,
      // ...iMaintainRoutes,
      ...indexRoutes,
      ...approvalRoute,
      ...maintainRoutes,
      ...customerRoutes,
      ...carRoute,
      ...productRoute,
      ...organization,
      ...platform
    ]
  }
];

export default RouterTable;
