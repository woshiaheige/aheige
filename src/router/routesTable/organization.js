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
    path: "/organization/role",
    name: "organization-role",
    key: "role",
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/role.vue"
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
  },
  {
    path: "/organization/permission",
    name: "organization-permission",
    key: "permission",
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/permission.vue"
      )
  },
  {
    path: "/organization/group",
    name: "organization-group",
    key: "group",
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/group.vue"
      )
  }
];
export default organization;
