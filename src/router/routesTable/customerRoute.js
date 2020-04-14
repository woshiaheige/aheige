const customer = [
  {
    path: "/customer/enterprise",
    name: "customer-enterprise",
    key: "enterprise",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise.vue"
      )
  },
  {
    path: "/customer/station",
    name: "customer-station",
    key: "station",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/station/station.vue"
      )
  },
  {
    path: "/customer/station/detail",
    name: "customer-station-detail",
    key: "station-detail",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/station/detail.vue"
      )
  },
  {
    path: "/customer/contract",
    name: "customer-contract",
    key: "contract",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/contract.vue"
      )
  },
  {
    path: "/customer/supplier",
    name: "customer-supplier",
    key: "supplier",
    component: () =>
      import(
        /* webpackChunkName: "view-standing" */
        "@/views/customer/supplier.vue"
      )
  }
];

export default customer;
