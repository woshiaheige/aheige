//引入mockjs
const Mock = require("mockjs");
//使用mockjs模拟数据
Mock.mock("/mock/maintain.js", () => {
  return {
    data: ["a", "b"]
  };
});

Mock.mock("/missionList", () => {
  return {
    data: [
      {
        "key|+1": 1,
        "mockTitle|1": ["肆无忌惮"],
        "mockContent|1": [
          "角色精湛主题略荒诞",
          "理由太短 是让人不安",
          "疑信参半 却无比期盼",
          "你的惯犯 圆满",
          "别让纠缠 显得 孤单"
        ],
        "mockAction|1": ["下载", "试听", "喜欢"]
      }
    ]
  };
});

// // const data = Mock.mock({
// //   // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
// //   "list|1-10": [
// //     {
// //       // 属性 id 是一个自增数，起始值为 1，每次增 1
// //       "id|+1": 1
// //     }
// //   ]
// // });
// // export default data;
