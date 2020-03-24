const indexRoutes = [
  {
    path: "/index",
    name: "index",
    key: "index",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/index/index.vue"
      )
  }
];

export default indexRoutes;
