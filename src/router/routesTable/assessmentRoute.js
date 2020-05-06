const assessmentRoutes = [
  {
    path: "/assessment/yearly-assessment",
    name: "yearly-assessment",
    key: "yearly-assessment",
    meta: {
      title: "年度考评",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/approval/approval-wait.vue"
      )
  }
];

export default assessmentRoutes;
