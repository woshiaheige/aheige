const knowledge = [
  {
    path: "/knowledge/type",
    name: "knowledge-type",
    key: "knowledge-type",
    component: () =>
      import(
        /* webpackChunkName: "view-approval" */
        "@/components/knowledge/type-index"
      )
  }
];

export default knowledge;
