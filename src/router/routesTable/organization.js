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
  },
  {
    path: "/organization/member",
    name: "organization-member",
    key: "member",
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/member.vue"
      )
  }
];
export default organization;
