const maintainRoutes = [
  {
    path: "/maintain/mission",
    name: "maintain-mission",
    key: "mission",
    meta: {
      title: "任务管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/mission.vue"
      )
  },
  {
    path: "/maintain/plan",
    name: "maintain-plan",
    key: "plan",
    meta: {
      title: "运维计划"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/maintain/plan.vue"
      )
  },
  {
    path: "/maintain/inspection",
    name: "maintain-inspection",
    key: "inspection",
    meta: {
      title: "日常巡检"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/maintain/inspection.vue"
      )
  },
  {
    path: "/maintain/maintain-log",
    name: "maintain-maintain-log",
    key: "maintain-log",
    meta: {
      title: "运维记录"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/maintain/maintain-log.vue"
      )
  },
  {
    path: "/maintain/station-mission",
    name: "maintain-station-mission",
    key: "station-mission",
    meta: {
      title: "任务管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/station-mission.vue"
      )
  },
  {
    path: "/maintain/complaint",
    name: "-complaint",
    key: "complaint",
    meta: {
      title: "上报投诉"
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
      title: "运维知识"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/maintain/knowledge"
      )
  }
];

export default maintainRoutes;
