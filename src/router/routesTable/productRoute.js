const productRoute = [
  {
    path: "/product",
    name: "product",
    key: "product",
    meta: {
      title: "物品管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/product/index.vue"
      )
  }
];

export default productRoute;
