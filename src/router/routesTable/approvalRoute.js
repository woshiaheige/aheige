const maintainRoutes = [
  {
    path: "/approval/wait-approval",
    name: "wait-approval",
    key: "wait",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/approval/wait-approval.vue"
      )
  },
  {
    path: "/approval/approval-participate",
    name: "approval-participate",
    key: "participate",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/approval/approval-participate.vue"
      )
  },
  {
    path: "/approval/start-approval",
    name: "start-approval",
    key: "start",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/approval/start-approval.vue"
      )
  },
  {
    path: "/approval/to-start",
    name: "to-start",
    key: "to-start",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/approval/to-start.vue"
      )
  }
];

export default maintainRoutes;
