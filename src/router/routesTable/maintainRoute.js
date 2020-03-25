const maintainRoutes = [
  {
    path: "/maintain/mission",
    name: "maintain-mission",
    key: "mission",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/maintain/mission.vue"
      )
  },
  {
    path: "/maintain/station-mission",
    name: "maintain-station-mission",
    key: "station-mission",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/maintain/station-mission.vue"
      )
  },
  {
    path: "/maintain/map",
    name: "maintain-map",
    key: "map",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/maintain/map.vue"
      )
  },
  {
    path: "/maintain/car-usage",
    name: "maintain-car-usage",
    key: "car-usage",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/maintain/car-usage.vue"
      )
  },
  {
    path: "/maintain/violation",
    name: "maintain-violation",
    key: "violation",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/maintain/violation.vue"
      )
  },
  {
    path: "/maintain/complaint",
    name: "maintain-complaint",
    key: "complaint",
    component: () =>
      import(
        /* webpackChunkName: "view-index" */
        "@/views/maintain/complaint.vue"
      )
  }
];

export default maintainRoutes;
