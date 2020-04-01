const standingRoutes = [
  {
    path: "/standing/car",
    name: "standing-car",
    key: "car",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/standing/car.vue"
      )
  },
  {
    path: "/standing/product",
    name: "standing-product",
    key: "product",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/standing/product.vue"
      )
  },
  {
    path: "/standing/supplier",
    name: "standing-supplier",
    key: "supplier",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/standing/supplier.vue"
      )
  }
];

export default standingRoutes;
