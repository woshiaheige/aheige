const maintainRoutes = [
  {
    path: "/approval/approval-wait",
    name: "approval-wait",
    key: "approval-wait",
    meta: {
      title: "等待我审批",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-wait.vue"
      )
  },
  {
    path: "/approval/approval-participate",
    name: "approval-participate",
    key: "approval-participate",
    meta: {
      title: "我参与的审批",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-participate.vue"
      )
  },
  {
    path: "/approval/approval-start",
    name: "approval-start",
    key: "approval-start",
    meta: {
      title: "我发起的审批",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-start.vue"
      )
  },
  {
    path: "/approval/approval-to-start",
    name: "approval-to-start",
    key: "approval-to-start",
    meta: {
      title: "发起审批",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-to-start.vue"
      )
  }
];

export default maintainRoutes;
