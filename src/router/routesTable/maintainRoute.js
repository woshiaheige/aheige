const maintainRoutes = [
  {
    path: "/maintain/mission",
    name: "maintain-mission",
    key: "mission",
    meta: {
      title: "任务管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/mission.vue"
      )
  },
  {
    path: "/maintain/board",
    name: "maintain-board",
    key: "board",
    meta: {
      title: "任务看板",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/board.vue"
      )
  },
  {
    path: "/maintain/plan",
    name: "maintain-plan",
    key: "plan",
    meta: {
      title: "运维计划",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/plan.vue"
      )
  },
  {
    path: "/maintain/scheme",
    name: "maintain-scheme",
    key: "scheme",
    meta: {
      title: "运维方案",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-scheme" */
        "@/views/maintain/scheme.vue"
      )
  },
  {
    path: "/maintain/complaint",
    name: "-complaint",
    key: "complaint",
    meta: {
      title: "客户投诉",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/complaint.vue"
      )
  },
  {
    path: "/maintain/knowledge",
    name: "maintain-knowledge",
    key: "knowledge",
    meta: {
      title: "运维知识",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/knowledge"
      )
  }
];

export default maintainRoutes;
