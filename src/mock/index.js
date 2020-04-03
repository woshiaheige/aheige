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

Mock.mock("/api/standing/supplier", {
  "data|10": [
    {
      "key|+1": 1,
      "name|1": ["原材料供应商", "车辆供应商", "机器供应商", "包装供应商"],
      "address|1": [
        "广东省广州市白云区景泰大道西65号",
        "宁夏回族自治区吴忠市同心县",
        "南京市江宁区天印大道",
        "合肥市肥西县紫蓬山风景区森林大道6号",
        "湘潭市湘乡市棋梓镇",
        "广西壮族自治区贺州市平桂区"
      ],
      "linkman|1": ["陈先生", "欧阳小姐", "张小姐", "王五", "李思", "梁乐"],
      "tel|1": [
        "158814211228",
        "13680566358",
        "13842643458",
        "13512451123",
        "18814255795",
        "16325899657",
        "136672133885"
      ],
      "rate|1": ["1", "2", "3", "4", "5"],
      "explain|1": ["...", "货源不足", "货源充足", "价格实惠"]
    }
  ],
  total: 10
});
Mock.mock("/api/standing/product", {
  "data|10": [
    {
      "key|+1": 1,
      "name|1": ["试剂CODcr在线", "中光", "试剂SO2", "试剂CH2O2"],
      "brand|1": [
        "美国Cygnus",
        "IBL",
        "Thermo Scientific",
        "百奥莱博",
        "santa cruz",
        "cchip",
        "广锐生物"
      ],
      "type|1": ["i", "ii", "iii", "iv"],
      "coding|1": [
        "10001",
        "10002",
        "10003",
        "10004",
        "10005",
        "10006",
        "10007"
      ],
      "inventory|1": ["10000", "122000", "2540000", "4000", "3500000"],
      "unit|1": ["支", "瓶", "袋"]
    }
  ],
  total: 10
});
