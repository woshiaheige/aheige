const assessmentRoutes = [
  {
    path: "/assessment/monthly-assessment",
    name: "monthly-assessment",
    key: "monthly-assessment",
    meta: {
      title: "月度考评",
      back: false,
      icon: "file-done",
      color: "#E3BF34"
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
      back: false,
      icon: "file-done",
      color: "#E3BF34"
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
      back: false,
      icon: "file-done",
      color: "#E3BF34"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/assessment/yearly.vue"
      )
  },
  {
    path: "/assessment/monthly-assessment/detail",
    name: "monthly-assessment-detail",
    key: "monthly-assessment-detail",
    meta: {
      title: "月度考评分析",
      back: true,
      icon: "file-done",
      color: "#E3BF34"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/assessment/detail.vue"
      )
  },
  {
    path: "/assessment/season-assessment/detail",
    name: "season-assessment-detail",
    key: "season-assessment-detail",
    meta: {
      title: "季度考评分析",
      back: true,
      icon: "file-done",
      color: "#E3BF34"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/assessment/detail.vue"
      )
  },
  {
    path: "/assessment/yearly-assessment/detail",
    name: "yearly-assessment-detail",
    key: "yearly-assessment-detail",
    meta: {
      title: "年度考评分析",
      back: true,
      icon: "file-done",
      color: "#E3BF34"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-assessment" */
        "@/views/assessment/detail.vue"
      )
  }
];

export default assessmentRoutes;
