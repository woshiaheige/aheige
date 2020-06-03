const indexRoutes = [
  {
    path: "/index/data",
    name: "index-data",
    key: "index-data",
    meta: {
      title: "运维监控",
      back: false,
      icon: "home",
      color: "#41C966"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/index/index.vue"
      )
  },
  {
    path: "/index/map",
    name: "index-map",
    key: "index-map",
    meta: {
      title: "地图监控",
      back: false,
      icon: "home",
      color: "#41C966"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/index/map.vue"
      )
  }
];

export default indexRoutes;
