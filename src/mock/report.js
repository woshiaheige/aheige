//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据

//仪器汇总列表
Mock.mock("/api/report/device-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "name|1": ["哈希NH3-H分析仪", "哈希化学需氧量分析仪", "K-37"],
      "recordTime|1": ["2020-2-5 12:32:00", "2020-2-15 12:32:00"],
      "station|1": ["可口可乐", "务庄污水"],
      instrumentType: ""
    }
  ],
  total: 10
});
//小组汇总列表
Mock.mock("/api/report/team-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      code: "12345678",
      "name|1": ["南海A组", "南海B组", "南海C组"],
      "stationNum|1": ["10", "20"],
      "station|1": ["可口可乐", "务庄污水"],
      "people|+1": ["张三", "李四", "王五", "马六", "关羽", "张飞"]
    }
  ],
  total: 10
});
//小组详情任务列表
Mock.mock("/api/report/team-detail-mission", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "stationName|1": [
        "明珠玻璃厂(烟气) - 18/03/05",
        "东方玻璃厂(烟气) - 18/03/05"
      ],
      "missionNum|1": [1, 2, 3, 4],
      "status|1": ["准时完成", "未完成"],
      "finishTime|1": ["2020-2-5 12:32:00", "2020-2-15 12:32:00"]
    }
  ],
  total: 10
});
