/**
 * 接口域名的管理
 */
const base = {
  api: "",
  mock: "/api/",
  file: ""
};
if (process.env.NODE_ENV == "development") {
  base.api = "http://192.168.1.180:3102/api/";
  // base.api = "http://192.168.1.69:3102/api/";//有海
  // base.api = "http://192.168.10.101:3102/api/";//101环境
} else if (process.env.NODE_ENV == "exam") {
  base.api = "http://192.168.10.101:3102/api/";
}

export default base;
