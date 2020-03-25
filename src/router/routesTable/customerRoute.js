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
      }
  ];
  
  export default customer;
  