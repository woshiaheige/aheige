const iMaintain = [
  {
    path: "/i-maintain/plan",
    name: "i-maintain-plan",
    key: "plan",
    component: () =>
      import(
        /* webpackChunkName: "view-i-maintain" */
        "@/views/iMaintain/plan.vue"
      )
  }
];

export default iMaintain;
