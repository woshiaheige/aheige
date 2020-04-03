const organization = [
  {
    path: "/organization/department",
    name: "organization-department",
    key: "department",
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/department.vue"
      )
  }
];
export default organization;
