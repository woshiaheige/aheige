//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据
Mock.mock("/api/data", () => {
  return {
    data: ["a", "b"]
  };
});
Mock.mock("/api/approval/wait", () => {
  return {
    data: {
      "object|2": {
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
      }
    }
  };
});
