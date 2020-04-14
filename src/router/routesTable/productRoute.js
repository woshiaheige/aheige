const productRoute = [
  {
    path: "/product",
    name: "product",
    key: "product",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/product/index.vue"
      )
  }
];

export default productRoute;
