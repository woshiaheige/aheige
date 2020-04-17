const organization = [
  {
    path: "/organization/role",
    name: "organization-role",
    key: "role",
    meta: {
      title: "权限管理",
      back: false
    },
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
    meta: {
      title: "用户管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/member.vue"
      )
  },
  {
    path: "/organization/group",
    name: "organization-group",
    key: "group",
    meta: {
      title: "小组管理",
      back: false
    },
    component: () =>
      import(
        /* webpackChunkName: "view-organization" */
        "@/views/organization/group.vue"
      )
  }
];
export default organization;
