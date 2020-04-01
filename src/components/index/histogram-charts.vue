<template>
  <div>
    <!--普通任务量-->
    <ve-histogram :data="chartData" :extend="chartExtend"></ve-histogram>
    <!--多任务-->
    <ve-histogram
      :data="moreData"
      :settings="moreSettings"
      :extend="chartExtend"
    ></ve-histogram>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    this.chartExtend = {
      series: {
        barWidth: 25
      },
      legend: {
        top: 20
      }
    };
    this.moreSettings = {
      stack: { 用户: ["普通任务", "突发任务"] },
      showLine: ["任务量", "站点量"]
    };
    return {
      chartData: {
        columns: ["name", "普通任务"],
        rows: [
          { name: "B小组", 普通任务: 353 },
          { name: "A小组", 普通任务: 133 },
          { name: "C小组", 普通任务: 293 },
          { name: "D小组", 普通任务: 173 },
          { name: "E小组", 普通任务: 392 },
          { name: "F小组", 普通任务: 92 },
          { name: "G小组", 普通任务: 312 },
          { name: "H小组", 普通任务: 192 },
          { name: "I小组", 普通任务: 72 }
        ]
      },
      moreData: {
        columns: ["name", "任务量", "普通任务", "突发任务", "站点量"],
        rows: [
          { name: "A小组", 任务量: 93, 普通任务: 83, 突发任务: 15, 站点量: 90 },
          { name: "B小组", 任务量: 53, 普通任务: 43, 突发任务: 4, 站点量: 46 },
          { name: "C小组", 任务量: 93, 普通任务: 90, 突发任务: 5, 站点量: 87 },
          { name: "D小组", 任务量: 73, 普通任务: 67, 突发任务: 9, 站点量: 70 },
          { name: "E小组", 任务量: 92, 普通任务: 81, 突发任务: 1, 站点量: 90 },
          { name: "F小组", 任务量: 92, 普通任务: 76, 突发任务: 4, 站点量: 90 },
          { name: "G小组", 任务量: 12, 普通任务: 9, 突发任务: 7, 站点量: 10 },
          { name: "H小组", 任务量: 82, 普通任务: 73, 突发任务: 5, 站点量: 76 },
          { name: "I小组", 任务量: 72, 普通任务: 58, 突发任务: 1, 站点量: 61 }
        ]
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
