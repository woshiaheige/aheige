const maintainRoutes = [
  {
    path: "/approval/approval-wait",
    name: "approval-wait",
    key: "approval-wait",
    meta: {
      title: "审批审核",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-wait.vue"
      )
  },
  {
    path: "/approval/my-approval",
    name: "my-approval",
    key: "my-approval",
    meta: {
      title: "我的审批",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/my-approval.vue"
      )
  }
];

export default maintainRoutes;
