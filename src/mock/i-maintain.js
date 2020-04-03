//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据

//获取运行日志列表
Mock.mock("/api/i-maintain/operation-log", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "num|1": [
        "可口可乐（污水）自动运维任务20/02/13（#1879",
        "百事可乐（污水）自动运维任务20/02/13（#1879"
      ],
      "station|1": ["可口可乐（污水)", "百事可乐（废气)"],
      "group|1": ["运维小组A", "运维小组B"],
      "enterprise|1": ["可口可乐佛山有限公司", "百事可乐佛山有限公司"],
      "instrument|1": ["仪器A", "仪器B"],
      "signature|1": ["未确认"],
      "missionTime|1": "2019-10-15"
    }
  ],
  total: 10
});

//获取报警管理列表
Mock.mock("/api/i-maintain/warning-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      msg: "值不变",
      "station|1": ["可口可乐（污水)", "百事可乐（废气)"],
      "status|1": "处理中",
      "instrument|1": ["仪器A", "仪器B"],
      "signature|1": ["未确认"],
      "warnTime|1": "2019-10-15"
    }
  ],
  total: 10
});
//运程控制
Mock.mock("/api/i-maintain/remote-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      msg: "值不变",
      "station|1": ["可口可乐（站点)", "百事可乐（站点)"],
      status: "",
      softwareVersion: "",
      hardwareVersion: "",
      control: "",
      createdAt: "2020-10-15 14:20:11"
    }
  ],
  total: 10
});
//运维方案列表
Mock.mock("/api/i-maintain/scheme-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "name|1": ["可口可乐（199污水)", "百事可乐（199污水)"],
      serialNum: "",
      schemeNum: "2",
      useNum: "10",
      createdBy: "马小跳",
      createdAt: "2019-11-15"
    }
  ],
  total: 10
});

//未计划站点列表
Mock.mock("/api/i-maintain/ready-plan", {
  "data|10": [
    {
      "key|+1": 1,
      "name|1": [
        "东南污水厂（出水口）",
        "广东省佛山市区南海区桂城年顺酒楼",
        "沙岗污水厂"
      ]
    }
  ]
});
//周站点列表
Mock.mock("/api/i-maintain/week-plan", {
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
      "list|3": [
        { name: "东南污水厂（出水口）" },
        { name: "佛山南海区桂城年顺酒楼" },
        { name: "沙岗污水厂" }
      ]
    }
  ]
});
//运维方案列表
Mock.mock("/api/i-maintain/template-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      "name|1": ["日常巡检", "固定污染"],
      "object|1": ["对象A", "对象B"],
      schemeNum: "2",
      useNum: "10",
      createdBy: "马小跳",
      createdAt: "2019-11-15 15:12:11"
    }
  ],
  total: 10
});
//实时动态列表
Mock.mock("/api/i-maintain/realtime-list", {
  "data|10": [
    {
      "key|+1": 1,
      "id|+1": 0,
      "order|+1": 1,
      area: "",
      point: "",
      "enterprise|1": ["可口可乐佛山有限公司", "百事可乐佛山有限公司"],
      updatedAt: "2019-9-20 11:20:15",
      "networkingStatus|1": ["在线", "离线"]
    }
  ],
  total: 10
});
