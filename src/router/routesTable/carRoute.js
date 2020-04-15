const car = [
  {
    path: "/car/manage",
    name: "car-manage",
    key: "manage",
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
    component: () =>
      import(
        /* webpackChunkName: "view-car" */
        "@/views/car/car-modal.vue"
      )
  }
];

export default car;
