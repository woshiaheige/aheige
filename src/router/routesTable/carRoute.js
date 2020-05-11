const car = [
  {
    path: "/car/manage",
    name: "car-manage",
    key: "manage",
    meta: {
      title: "车辆管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/manage.vue"
      )
  },
  {
    path: "/car/usage",
    name: "car-usage",
    key: "usage",
    meta: {
      title: "车辆使用记录",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/usage.vue"
      )
  },
  {
    path: "/car/gas",
    name: "car-gas",
    key: "car-gas",
    meta: {
      title: "油费管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/gas.vue"
      )
  },
  {
    path: "/car/toll",
    name: "car-toll",
    key: "car-toll",
    meta: {
      title: "过路费管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/toll.vue"
      )
  },
  {
    path: "/car/insurance",
    name: "car-insurance",
    key: "car-insurance",
    meta: {
      title: "保险费管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/toll.vue"
      )
  },
  {
    path: "/car/repair",
    name: "car-repair",
    key: "car-repair",
    meta: {
      title: "维修保养费",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/repair.vue"
      )
  },
  {
    path: "/car/statistic",
    name: "car-statistic",
    key: "car-statistic",
    meta: {
      title: "车辆成本分析",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/statistic.vue"
      )
  },
  {
    path: "/car/usage/detail",
    name: "car-usage-detail",
    key: "usage-detail",
    meta: {
      title: "行驶路径",
      back: true
    },
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/car-modal.vue"
      )
  }
];

export default car;
