const car = [
  {
    path: "/car/manage",
    name: "car-manage",
    key: "manage",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/car/manage.vue"
      )
  },
  {
    path: "/car/usage",
    name: "car-usage",
    key: "usage",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/car/usage.vue"
      )
  }
];

export default car;
