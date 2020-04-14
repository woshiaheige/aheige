const car = [
  {
    path: "/car",
    name: "car",
    key: "car",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/car/index.vue"
      )
  }
];

export default car;
