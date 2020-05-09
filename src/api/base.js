/**
 * 接口域名的管理
 */
const base = {
  api: "",
  mock: "/api/",
  file: ""
};
if (process.env.NODE_ENV == "development") {
<<<<<<< HEAD
  base.api = "http://183.10.101.72:3102/api/"
=======
  base.api = "http://192.168.1.41:3102/api/";
>>>>>>> 2d77f9146ec922538d95973e35ddd9c87e9a8d97
} else if (process.env.NODE_ENV == "exam") {
  base.api = "http://192.168.10.101:3102/api/";
} else if (process.env.NODE_ENV == "production") {
  base.api = "http://183.6.114.72:3102/api/";
}

export default base;
