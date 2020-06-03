const customer = [
  {
    path: "/customer/enterprise",
    name: "customer-enterprise",
    key: "enterprise",
    meta: {
      title: "企业信息",
      back: false,
      icon: "team",
      color: "#CD796B"
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
      title: "站点管理",
      back: false,
      icon: "team",
      color: "#CD796B"
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
      back: false,
      icon: "team",
      color: "#CD796B"
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
      back: true,
      icon: "team",
      color: "#CD796B"
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
      title: "企业站点",
      back: true,
      icon: "team",
      color: "#CD796B"
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
      back: true,
      icon: "team",
      color: "#CD796B"
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
      title: "监测设备",
      back: true,
      icon: "team",
      color: "#CD796B"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/station/device.vue"
      )
  },
  {
    path: "/customer/station/factor",
    name: "customer-station-factor",
    key: "customer-station-factor",
    meta: {
      title: "监测因子",
      back: true,
      icon: "team",
      color: "#CD796B"
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
      back: true,
      icon: "team",
      color: "#CD796B"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-customer" */
        "@/views/customer/station/device.vue"
      )
  }
];

export default customer;
