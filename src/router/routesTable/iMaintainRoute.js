const iMaintain = [
  // {
  //   path: "/i-maintain/plan",
  //   name: "i-maintain-plan",
  //   key: "plan",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "view-i-maintain" */
  //       "@/views/iMaintain/plan.vue"
  //     )
  // },
  {
    path: "/i-maintain/operation-log",
    name: "i-maintain-operation-log",
    key: "operation-log",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/operation-log.vue"
      )
  },
  {
    path: "/i-maintain/realtime",
    name: "i-maintain-realtime",
    key: "realtime",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/realtime.vue"
      )
  },
  {
    path: "/i-maintain/remote",
    name: "i-maintain-remote",
    key: "remote",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/remote.vue"
      )
  },
  {
    path: "/i-maintain/scheme",
    name: "i-maintain-scheme",
    key: "scheme",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/scheme/scheme.vue"
      )
  },
  {
    path: "/i-maintain/scheme/detail",
    name: "i-maintain-scheme-detail",
    key: "scheme-detail",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/scheme/detail.vue"
      )
  },
  {
    path: "/i-maintain/template",
    name: "i-maintain-template",
    key: "template",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/template.vue"
      )
  },
  {
    path: "/i-maintain/warning",
    name: "i-maintain-warning",
    key: "warning",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/warning.vue"
      )
  }
];

export default iMaintain;
