const indexRoutes = [
  {
    path: "/index",
    name: "index",
    key: "index",
    meta: {
      title: "运维一览"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/index/index.vue"
      )
  }
];

export default indexRoutes;
