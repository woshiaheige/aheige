<template>
  <div>
    <!--普通任务量-->
    <ve-histogram
      :data="chartData"
      :extend="chartExtend"
      :title="chartTitle"
    ></ve-histogram>
    <!--多任务-->
    <ve-histogram
      :data="moreData"
      :settings="moreSettings"
      :extend="chartExtend"
      :title="moreTitle"
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
      chartTitle: {
        text: "任务项数量",
        top: 14,
        left: 0,
        textStyle: {
          fontSize: 14
          // fontWeight: "normal"
        }
      },
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
      moreTitle: {
        text: "数量",
        top: 14,
        left: 0,
        textStyle: {
          fontSize: 14
          // fontWeight: "normal"
        }
      },
      // yAxis: [
      //   {
      //     type: "value",
      //     name: "电导率us/cm",
      //     nameLocation: "center",
      //     nameGap: 10, //与轴线间距
      //     nameTextStyle: {
      //       //文字样式
      //       fontSize: 14
      //     }
      //   }
      // ],
      moreData: {
        columns: ["name", "任务量", "普通任务", "突发任务", "站点量"],
        rows: [
          { name: "02-02", 任务量: 93, 普通任务: 83, 突发任务: 15, 站点量: 90 },
          { name: "02-03", 任务量: 53, 普通任务: 43, 突发任务: 4, 站点量: 46 },
          { name: "02-04", 任务量: 93, 普通任务: 90, 突发任务: 5, 站点量: 87 },
          { name: "02-05", 任务量: 73, 普通任务: 67, 突发任务: 9, 站点量: 70 },
          { name: "02-06", 任务量: 92, 普通任务: 81, 突发任务: 1, 站点量: 90 },
          { name: "02-07", 任务量: 92, 普通任务: 76, 突发任务: 4, 站点量: 90 },
          { name: "02-08", 任务量: 12, 普通任务: 9, 突发任务: 7, 站点量: 10 },
          { name: "02-09", 任务量: 82, 普通任务: 73, 突发任务: 5, 站点量: 76 },
          { name: "02-10", 任务量: 72, 普通任务: 58, 突发任务: 1, 站点量: 61 }
        ]
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
