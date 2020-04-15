const monitorRoute = [
  {
    path: "/monitor/data",
    name: "monitor-data",
    key: "data",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/data.vue"
      )
  },
  {
    path: "/monitor/exceed",
    name: "monitor-exceed",
    key: "exceed",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/exceed.vue"
      )
  },
  {
    path: "/monitor/report",
    name: "monitor-report",
    key: "report",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/report.vue"
      )
  },
  {
    path: "/monitor/speed",
    name: "monitor-speed",
    key: "speed",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/speed.vue"
      )
  },
  {
    path: "/monitor/warn",
    name: "monitor-warn",
    key: "warn",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/warn.vue"
      )
  }
];

export default monitorRoute;
