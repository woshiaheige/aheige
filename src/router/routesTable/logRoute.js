const logRoutes = [
  {
    path: "/log/login",
    name: "login-log",
    key: "login-log",
    meta: {
      title: "登录日志",
      back: false,
      icon: "book",
      color: "#EC4949"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-log" */
        "@/views/log/login.vue"
      )
  },
  {
    path: "/log/operation",
    name: "operation-log",
    key: "operation-log",
    meta: {
      title: "操作日志",
      back: false,
      icon: "book",
      color: "#EC4949"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-log" */
        "@/views/log/operation.vue"
      )
  },
  {
    path: "/log/message",
    name: "message-log",
    key: "message-log",
    meta: {
      title: "报文日志",
      back: false,
      icon: "book",
      color: "#EC4949"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-log" */
        "@/views/log/message.vue"
      )
  },
  {
    path: "/log/control",
    name: "control-log",
    key: "control-log",
    meta: {
      title: "反控日志",
      back: false,
      icon: "book",
      color: "#EC4949"
    },
    component: () =>
      import(
        /* webpackChunkName: "view-log" */
        "@/views/log/control.vue"
      )
  }
];

export default logRoutes;
