const dashboardRoute = [
  {
    path: "/dashboard",
    name: "dashboard",
    key: "dashboard",
    meta: {
      title: "首页",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-product" */
        "@/views/Dashboard.vue"
      )
  }
];

export default dashboardRoute;
