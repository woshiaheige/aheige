const productRoute = [
  {
    path: "/product/reagent",
    name: "product-reagent",
    key: "reagent",
    meta: {
      title: "试剂管理",
      back: false
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
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-product" */
        "@/views/product/supplier.vue"
      )
  }
];

export default productRoute;
