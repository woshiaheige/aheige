/**
 * 接口域名的管理
 */
const base = {
  api: "",
  mock: "/api/",
  file: ""
};
if (process.env.NODE_ENV == "development") {
  base.api = "http://192.168.1.40:3102/api/";
  // base.api = "http://192.168.1.180:3102/api/";
} else if (process.env.NODE_ENV == "exam") {
  base.api = "http://192.168.10.101:3102/api/";
} else if (process.env.NODE_ENV == "production") {
  base.api = "http://192.168.10.101:3102/api/";
}

export default base;
