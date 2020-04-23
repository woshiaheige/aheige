const customer = [
  {
    path: "/customer/enterprise",
    name: "customer-enterprise",
    key: "enterprise",
    meta: {
      title: "企业信息",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/enterprise.vue"
      )
  },
  {
    path: "/customer/station",
    name: "customer-station",
    key: "station",
    meta: {
      title: "监控点管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/station/station.vue"
      )
  },
  {
    path: "/customer/contract",
    name: "customer-contract",
    key: "contract",
    meta: {
      title: "合同管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/contract.vue"
      )
  },
  {
    path: "/customer/enterprise/user",
    name: "customer-enterprise-user",
    key: "customer-enterprise-user",
    meta: {
      title: "企业用户",
      back: true
    },
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
    meta: {
      title: "企业监控点",
      back: true
    },
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
    meta: {
      title: "监测因子",
      back: true
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/factor.vue"
      )
  },
  {
    path: "/customer/station/factor",
    name: "customer-station-factor",
    key: "customer-station-factor",
    meta: {
      title: "监测因子",
      back: true
    },
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
    meta: {
      title: "监测设备",
      back: true
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/station/device.vue"
      )
  }
];

export default customer;
