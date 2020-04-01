//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据
Mock.mock("/api/data", () => {
  return {
    data: ["a", "b"]
  };
});
Mock.mock("/api/approval/wait", {
  "data|10": [
    {
      "key|+1": 1,
      "name|1": ["事件1", "事件2", "事件3"],
      "status|1": ["处理中", "通过", "否决"],
      people: "陈琛琛",
      time: '@DATETIME("yyyy-MM-dd HH:mm:ss")'
    }
  ],
  total: 10
});
Mock.mock("/api/standing/car", {
  "data|10": [
    {
      "key|+1": 1,
      "name|1": [
        "粤A▪52200",
        "粤A▪52121",
        "粤A▪88888",
        "粤B▪66666",
        "粤C▪77777",
        "粤A▪56789"
      ],
      "brand|1": [
        "世爵C8Laviolette",
        "玛莎拉蒂grancabrio",
        "劳斯莱斯幻影",
        "保时捷卡宴GTS",
        "福特野马ShelbyGT500",
        "宝马7系",
        "奔驰SLSAMG"
      ],
      "status|1": ["可用", "停用"],
      "group|1": ["A小组", "B小组"]
    }
  ],
  total: 10
});
