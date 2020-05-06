const assessmentRoutes = [
  {
    path: "/assessment/monthly-assessment",
    name: "monthly-assessment",
    key: "monthly-assessment",
    meta: {
      title: "月度考评",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/assessment/monthly.vue"
      )
  },
  {
    path: "/assessment/season-assessment",
    name: "season-assessment",
    key: "season-assessment",
    meta: {
      title: "季度考评",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/assessment/season.vue"
      )
  },
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
        "@/views/assessment/yearly.vue"
      )
  }
];

export default assessmentRoutes;
