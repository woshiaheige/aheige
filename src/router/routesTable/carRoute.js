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
    path: "/car/usage/detail",
    name: "car-usage-detail",
    key: "car-usage-detail",
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
