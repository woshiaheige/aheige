const announcement = [
  {
    path: "/announcement",
    name: "announcement",
    key: "announcement",
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/views/announcement"
      )
  }
];

export default announcement;
