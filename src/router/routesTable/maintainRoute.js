const maintainRoutes = [
  {
    path: "/maintain/mission",
    name: "maintain-mission",
    key: "mission",
    meta: {
      title: "任务管理",
      back: false,
      icon: "control",
      color: "#3387B3"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/mission.vue"
      )
  },
  {
    path: "/maintain/mission/detail",
    name: "maintain-mission-detail",
    key: "maintain-mission-detail",
    meta: {
      title: "站点任务",
      back: true,
      icon: "control",
      color: "#3387B3"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/mission-detail.vue"
      )
  },
  {
    path: "/maintain/dispatch",
    name: "maintain-dispatch",
    key: "dispatch",
    meta: {
      title: "任务调度",
      back: false,
      icon: "control",
      color: "#3387B3"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/dispatch.vue"
      )
  },
  {
    path: "/maintain/board",
    name: "maintain-board",
    key: "board",
    meta: {
      title: "计划看板",
      back: false,
      icon: "control",
      color: "#3387B3"
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
      back: false,
      icon: "control",
      color: "#3387B3"
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
      back: false,
      icon: "control",
      color: "#3387B3"
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
      back: false,
      icon: "control",
      color: "#3387B3"
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
      back: false,
      icon: "control",
      color: "#3387B3"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/knowledge"
      )
  },
  {
    path: "/maintain/knowledge/article",
    name: "maintain-knowledge-article",
    key: "article",
    meta: {
      title: "文章查看",
      back: true,
      icon: "control",
      color: "#3387B3"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/article"
      )
  },
  {
    path: "/maintain/notification",
    name: "maintain-notification",
    key: "notification",
    meta: {
      title: "报表推送",
      back: false,
      icon: "control",
      color: "#3387B3"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/notification"
      )
  }
];

export default maintainRoutes;
