const maintainRoutes = [
  {
    path: "/maintain/mission",
    name: "maintain-mission",
    key: "mission",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/index/index.vue"
      )
  }
];

export default maintainRoutes;
