//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据

//一企一档

//企业列表
Mock.mock("/api/customer/enterprise-list", {
  data: {
    "records|10": [
      {
        "key|+1": 1,
        "id|+1": 0,
        "order|+1": 1,
        "name|1": ["腾讯", "阿里巴巴", "字节跳动"],
        "address|1": ["南海区", "禅城区", "顺德区"],
        "stationNum|1": ["2", "3", "5"],
        "stations|1": [
          ["站点A", "站点B"],
          ["站点C", "站点E"]
        ],
        group: "小组1",
        "principal|1": ["麻花腾", "雷军"]
      }
    ],
    total: 10
  }
});

//站点管理

//站点列表
Mock.mock("/api/customer/station-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "stationName|1": [
        "可口可乐（污水）（CT4406050009301）",
        "可口可乐（烟气）"
      ],
      "enterprise|1": ["阿里巴巴", "可口可乐佛山有限公司"],
      "project|1": ["废水现场维护", "废水现场维护", "烟气现场维护"],
      "group|1": ["顺德A组", "顺德B组", "顺德C组"]
    }
  ],
  total: 10
});

//合同管理

//合同列表
Mock.mock("/api/customer/contract-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "num|1": ["CT4406050009301", "FC4412050009301", "GR4412050009456"],
      "name|1": ["阿里巴巴", "可口可乐佛山有限公司"],
      "startTime|1": ["2020-2-5 12:32:00", "2020-2-15 12:32:00"],
      "end|1": ["2020-2-5 12:32:00", "2020-2-15 12:32:00"]
    }
  ],
  state: 0,
  total: 10
});
