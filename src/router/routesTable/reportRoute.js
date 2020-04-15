const reportRoutes = [
  {
    path: "/report/daily",
    name: "report-daily",
    key: "daily",
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/report/daily.vue"
      )
  },
  {
    path: "/report/device",
    name: "report-device",
    key: "device",
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/report/device/device.vue"
      )
  },
  {
    path: "/report/device/detail",
    name: "report-device-detail",
    key: "device-detail",
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/report/device/detail.vue"
      )
  },
  {
    path: "/report/i-report",
    name: "report-i-report",
    key: "i-report",
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/report/i-report.vue"
      )
  },
  // {
  //   path: "/report/inspection",
  //   name: "report-inspection",
  //   key: "inspection",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "view-report" */
  //       "@/views/report/inspection.vue"
  //     )
  // },
  // {
  //   path: "/report/maintain-log",
  //   name: "report-maintain-log",
  //   key: "maintain-log",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "view-report" */
  //       "@/views/report/maintain-log.vue"
  //     )
  // },
  {
    path: "/report/team",
    name: "report-team",
    key: "team",
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/report/team/team.vue"
      )
  },
  {
    path: "/report/team/detail",
    name: "report-team-detail",
    key: "team-detail",
    component: () =>
      import(
        /* webpackChunkName: "view-report" */
        "@/views/report/team/detail.vue"
      )
  }
];

export default reportRoutes;
