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
  },
  {
    path: "/platform/dictionary",
    name: "/platform-dictionary",
    key: "dictionary",
    component: () =>
      import(
        /* webpackChunkName: "view-/platform" */
        "@/views/platform/dictionary.vue"
      )
  },
  {
    path: "/platform/industry",
    name: "/platform-industry",
    key: "industry",
    component: () =>
      import(
        /* webpackChunkName: "view-/platform" */
        "@/views/platform/industry.vue"
      )
  }
];

export default platform;
