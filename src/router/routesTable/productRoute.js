const productRoute = [
  {
    path: "/product/reagent",
    name: "product-reagent",
    key: "reagent",
    meta: {
      title: "物资库存",
      back: false,
      icon: "gold",
      color: "#37CF98"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-product" */
        "@/views/product/reagent.vue"
      )
  },
  {
    path: "/product/supplier",
    name: "product-supplier",
    key: "supplier",
    meta: {
      title: "供应商管理",
      back: false,
      icon: "gold",
      color: "#37CF98"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-product" */
        "@/views/product/supplier.vue"
      )
  }
];

export default productRoute;
