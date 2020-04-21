const monitorRoute = [
  //监测数据
  {
    path: "/monitor/standing",
    name: "monitor-standing",
    key: "monitor-standing",
    meta: {
      title: "监测数据",
      back: false
    },
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
    meta: {
      title: "站点数据",
      back: true
    },
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
    meta: {
      title: "超标数据",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/exceed.vue"
      )
  },
  //异常数据
  {
    path: "/monitor/unusual",
    name: "monitor-unusual",
    key: "monitor-unusual",
    meta: {
      title: "异常数据",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/unusual.vue"
      )
  },
  //数据报表
  {
    path: "/monitor/report",
    name: "monitor-report",
    key: "monitor-report",
    meta: {
      title: "数据报表",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-monitor" */
        "@/views/monitor/report.vue"
      )
  }
];

export default monitorRoute;
