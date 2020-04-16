const monitorRoute = [
  //监测数据
  {
    path: "/monitor/standing",
    name: "monitor-standing",
    key: "monitor-standing",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/standing/standing.vue"
      )
  },
  //监测数据
  {
    path: "/monitor/standing/data",
    name: "monitor-standing-data",
    key: "monitor-standing-data",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/standing/data.vue"
      )
  },
  //超标数据
  {
    path: "/monitor/exceed",
    name: "monitor-exceed",
    key: "monitor-exceed",
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
    key: "monitor-report",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/report.vue"
      )
  },
  //异常数据
  {
    path: "/monitor/unusual",
    name: "monitor-unusual",
    key: "monitor-unusual",
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/unusual.vue"
      )
  }
];

export default monitorRoute;
