const customer = [
  {
    path: "/customer/enterprise",
    name: "customer-enterprise",
    key: "enterprise",
    meta: {
      title: "企业信息"
    },
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
    meta: {
      title: "监控点管理"
    },
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
    meta: {
      title: "合同管理"
    },
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
    meta: {
      title: "供应商管理"
    },
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
    meta: {
      title: "企业用户"
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
      title: "企业监控点"
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
      title: "监测因子"
    },
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
    meta: {
      title: "监测设备"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/enterprise/device.vue"
      )
  }
];

export default customer;
