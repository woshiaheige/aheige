const costRoutes = [
  {
    path: "/cost/device-cost",
    name: "device-cost",
    key: "device-cost",
    meta: {
      title: "设备成本",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/device.vue"
      )
  },
  {
    path: "/cost/lab-device-cost",
    name: "lab-device-cost",
    key: "lab-device-cost",
    meta: {
      title: "实验室设备",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/lab-device.vue"
      )
  },
  {
    path: "/cost/assembly-cost",
    name: "assembly-cost",
    key: "assembly-cost",
    meta: {
      title: "部件成本",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/assembly.vue"
      )
  },
  {
    path: "/cost/reagent-cost",
    name: "reagent-cost",
    key: "reagent-cost",
    meta: {
      title: "试剂成本",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/reagent.vue"
      )
  },
  {
    path: "/cost/standardgases-cost",
    name: "standardgases-cost",
    key: "standardgases-cost",
    meta: {
      title: "标气成本",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/standardgases.vue"
      )
  },
  {
    path: "/cost/PPE-cost",
    name: "PPE-cost",
    key: "PPE-cost",
    meta: {
      title: "劳保用品",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/ppe.vue"
      )
  },
  {
    path: "/cost/car-cost",
    name: "car-cost",
    key: "car-cost",
    meta: {
      title: "车辆成本",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/car.vue"
      )
  },
  {
    path: "/cost/other-cost",
    name: "other-cost",
    key: "other-cost",
    meta: {
      title: "其他成本",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/other.vue"
      )
  },
  {
    path: "/cost/cost-statistic",
    name: "cost-statistic",
    key: "cost-statistic",
    meta: {
      title: "成本分析",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-cost" */
        "@/views/cost/statistic.vue"
      )
  }
];

export default costRoutes;
