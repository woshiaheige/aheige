const maintainRoutes = [
  {
    path: "/maintain/mission",
    name: "maintain-mission",
    key: "mission",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/mission.vue"
      )
  },
  {
    path: "/maintain/station-mission",
    name: "maintain-station-mission",
    key: "station-mission",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/station-mission.vue"
      )
  },
  {
    path: "/maintain/map",
    name: "maintain-map",
    key: "map",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/map.vue"
      )
  },
  {
    path: "/maintain/car-usage",
    name: "maintain-car-usage",
    key: "car-usage",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/car-usage.vue"
      )
  },
  {
    path: "/maintain/car-usage/detail",
    name: "maintain-car-usage-detail",
    key: "car-usage-detail",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/components/maintain/car/detail.vue"
      )
  },
  {
    path: "/maintain/violation",
    name: "maintain-violation",
    key: "violation",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/violation.vue"
      )
  },
  {
    path: "/maintain/complaint",
    name: "-complaint",
    key: "complaint",
    component: () =>
      import(
        /* webpackChunkName: "view-maintain" */
        "@/views/maintain/complaint.vue"
      )
  },
  {
    path: "/maintain/knowledge",
    name: "maintain-knowledge",
    key: "knowledge",
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/maintain/knowledge"
      )
  }
];

export default maintainRoutes;
