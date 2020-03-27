//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据

//未计划站点列表
Mock.mock("/api/operation/ready-plan", {
  "data|10": [
    {
      "key|+1": 1,
      "name|1": ["东南污水厂（出水口）", "佛山南海区桂城年顺酒楼", "沙岗污水厂"]
    }
  ]
});
//未计划站点列表
Mock.mock("/api/operation/week-plan", {
  "data|7": [
    {
      "week|+1": [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      "list|2": [
        { name: "东南污水厂（出水口）" },
        { name: "佛山南海区桂城年顺酒楼" },
        { name: "沙岗污水厂" }
      ]
    }
  ]
});
