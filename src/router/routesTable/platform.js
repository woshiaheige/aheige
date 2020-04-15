const platform = [
  {
    path: "/platform/factors",
    name: "platform-factors",
    key: "factors",
    component: () =>
      import(
        /* webpackChunkName: "view-platform" */
        "@/views/platform/factors.vue"
      )
  },
  {
    path: "/platform/instrument",
    name: "platform-instrument",
    key: "instrument",
    component: () =>
      import(
        /* webpackChunkName: "view-platform" */
        "@/views/platform/instrument.vue"
      )
  },
  {
    path: "/platform/operation",
    name: "platform-operation",
    key: "operation",
    component: () =>
      import(
        /* webpackChunkName: "view-platform" */
        "@/views/platform/operation.vue"
      )
  },
  {
    path: "/platform/scheme",
    name: "platform-scheme",
    key: "scheme",
    component: () =>
      import(
        /* webpackChunkName: "view-platform" */
        "@/views/platform/scheme/scheme.vue"
      )
  }
];

export default platform;
