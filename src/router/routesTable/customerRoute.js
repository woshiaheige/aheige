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
        "@/views/customer/station.vue"
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
  },
  {
    path: "/customer/enterprise/user",
    name: "customer-enterprise-user",
    key: "customer-enterprise-user",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/user-enterprise.vue"
      )
  },
  {
    path: "/customer/enterprise/station",
    name: "customer-enterprise-station",
    key: "customer-enterprise-station",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/station-enterprise.vue"
      )
  },
  {
    path: "/customer/enterprise/factor",
    name: "customer-enterprise-factor",
    key: "customer-enterprise-factor",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/factor.vue"
      )
  },
  {
    path: "/customer/enterprise/device",
    name: "customer-enterprise-device",
    key: "customer-enterprise-device",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/device.vue"
      )
  },
  {
    path: "/customer/station/factor",
    name: "customer-station-factor",
    key: "customer-station-factor",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/factor.vue"
      )
  },
  {
    path: "/customer/station/device",
    name: "customer-station-device",
    key: "customer-station-device",
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/device.vue"
      )
  }
];

export default customer;
