//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据
Mock.mock("/api/data", () => {
  return {
    data: ["a", "b"]
  };
});
Mock.mock("/api/approval/wait", {
  "dataSours|3": [
    {
      "key|+1": 1,
      "name|1": ["事件1", "事件2", "事件3"],
      "status|1": ["处理中", "通过", "否决"],
      people: "people",
      time: '@DATETIME("yyyy-MM-dd HH:mm:ss")'
    }
  ]
});
