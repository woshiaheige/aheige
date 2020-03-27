const workbench = [
  {
    path: "/workbench",
    name: "workbench",
    key: "workbench",
    component: () =>
      import(
        /* webpackChunkName: "view-workbench" */
        "@/views/workbench/workbench.vue"
      )
  }
];

export default workbench;
