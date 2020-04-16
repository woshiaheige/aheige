const monitorRoute = [
  //监测数据
  {
    path: "/monitor/standing",
    name: "monitor-standing",
    key: "standing",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/standing.vue"
      )
  },
  //监测数据
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
  //超标数据
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
  //数据报表
  {
    path: "/monitor/report",
    name: "monitor-report",
    key: "report",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/report.vue"
      )
  }
];

export default monitorRoute;
