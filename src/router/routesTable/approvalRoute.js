const maintainRoutes = [
  {
    path: "/approval",
    name: "approval",
    key: "approval",
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/approval/wait-approval.vue"
      )
  }
];

export default maintainRoutes;
