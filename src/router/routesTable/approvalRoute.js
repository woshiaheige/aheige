const maintainRoutes = [
  {
    path: "/approval",
    name: "approval",
    key: "approval",
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/approval-index.vue"
      )
  }
];

export default maintainRoutes;
