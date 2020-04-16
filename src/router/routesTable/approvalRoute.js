const maintainRoutes = [
  {
    path: "/approval",
    name: "approval",
    key: "approval",
    meta: {
      title: "审批管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-index.vue"
      )
  }
];

export default maintainRoutes;
