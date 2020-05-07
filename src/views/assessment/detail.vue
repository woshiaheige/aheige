<template>
  <div>
    <a-card :bordered="false">
      <ve-histogram :data="chartData"></ve-histogram>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div id="lineChart" style="width:100%; height: 400px"></div>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div id="pieChart" style="width:100%; height: 400px"></div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: ["month", "month"],
      value: [],
      chartData: {
        columns: ["运维项目", "已完成", "未完成"],
        rows: [
          { 运维项目: "巡检", 已完成: 1393, 未完成: 1093 },
          { 运维项目: "维护", 已完成: 3530, 未完成: 3230 },
          { 运维项目: "校准", 已完成: 2923, 未完成: 2623 }
        ]
      }
    };
  },
  mounted() {
    this.drawPieChart();
    this.drawLineChart();
  },
  methods: {
    handleChange(value) {
      this.value = value;
    },
    handlePanelChange(value, mode) {
      this.value = value;
      this.mode = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
    },
    drawPieChart() {
      let pieChart = this.$echarts.init(document.getElementById("pieChart"));

      this.$nextTick(() => {
        pieChart.resize();
      });

      window.addEventListener("resize", () => {
        pieChart.resize();
      });
      let option = {
        title: {
          text: "运维活动统计次数走势分析",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["巡检", "维护", "校准"]
        },
        series: [
          {
            name: "成本统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "巡检" },
              { value: 310, name: "维护" },
              { value: 234, name: "校准" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      pieChart.setOption(option);
    },
    drawLineChart() {
      let lineChart = this.$echarts.init(document.getElementById("lineChart"));

      this.$nextTick(() => {
        lineChart.resize();
      });

      window.addEventListener("resize", () => {
        lineChart.resize();
      });
      let option = {
        title: {
          text: "运维活动统计次数走势分析"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["巡检", "维护", "校准"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2020-02", "2020-03", "2020-04"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "巡检",
            type: "line",
            stack: "总量",
            data: [120, 132, 101]
          },
          {
            name: "维护",
            type: "line",
            stack: "总量",
            data: [220, 182, 191]
          },
          {
            name: "校准",
            type: "line",
            stack: "总量",
            data: [150, 232, 201]
          }
        ]
      };

      lineChart.setOption(option);
    }
  }
};
</script>

<style></style>
