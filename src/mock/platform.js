//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据

//仪器型号设置列表
Mock.mock("/api/i-maintain/instrument-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "name|1": ["K-37", "NSA-3080A"],
      sortnum: "12345678",
      relativeUnit: "",
      factory: ""
    }
  ],
  total: 10
});
//获取运行日志列表
Mock.mock("/api/i-maintain/factors-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "name|1": ["污水", "色度"],
      code: "W0000",
      sort: "水",
      speedUnit: "秒/升",
      totalUnit: "立方米"
    }
  ],
  total: 10
});
