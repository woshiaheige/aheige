const announcement = [
  {
    path: "/announcement",
    name: "announcement",
    key: "announcement",
    component: () =>
      import(
        /* webpackChunkName: "view-announcement" */
        "@/views/announcement"
      )
  }
];

export default announcement;
