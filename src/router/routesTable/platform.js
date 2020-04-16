const platform = [
  {
    path: "/platform/factors",
    name: "platform-factors",
    key: "factors",
    meta: {
      title: "因子设置"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-platform" */
        "@/views/platform/factors.vue"
      )
  },
  {
    path: "/platform/operation",
    name: "platform-operation",
    key: "operation",
    meta: {
      title: "运维设置"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-platform" */
        "@/views/platform/operation.vue"
      )
  },
  {
    path: "/platform/dictionary",
    name: "/platform-dictionary",
    key: "dictionary",
    meta: {
      title: "数据字典"
    },
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
    meta: {
      title: "行业设置"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-/platform" */
        "@/views/platform/industry.vue"
      )
  }
];

export default platform;
