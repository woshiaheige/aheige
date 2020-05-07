<template>
  <div>
    <a-card :bordered="false">
      <div id="pieChart" style="width:100%; height: 400px"></div>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div id="lineChart" style="width:100%; height: 400px"></div>
    </a-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawPieChart();
    this.drawLineChart();
  },
  methods: {
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
          text: "成本统计分析",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "设备成本",
            "实验室设备成本",
            "部件成本",
            "试剂成本",
            "标气成本",
            "劳保用品成本",
            "车辆成本",
            "其他成本"
          ]
        },
        series: [
          {
            name: "成本统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "设备成本" },
              { value: 310, name: "实验室设备成本" },
              { value: 234, name: "部件成本" },
              { value: 135, name: "试剂成本" },
              { value: 1548, name: "标气成本" },
              { value: 1548, name: "劳保用品成本" },
              { value: 1548, name: "车辆成本" },
              { value: 1548, name: "其他成本" }
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
          text: "成本趋势"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "设备成本",
            "实验室设备成本",
            "部件成本",
            "试剂成本",
            "标气成本",
            "劳保用品成本",
            "车辆成本",
            "其他成本"
          ]
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
            name: "设备成本",
            type: "line",
            stack: "总量",
            data: [120, 132, 101]
          },
          {
            name: "实验室设备成本",
            type: "line",
            stack: "总量",
            data: [220, 182, 191]
          },
          {
            name: "部件成本",
            type: "line",
            stack: "总量",
            data: [150, 232, 201]
          },
          {
            name: "试剂成本",
            type: "line",
            stack: "总量",
            data: [320, 332, 301]
          },
          {
            name: "标气成本",
            type: "line",
            stack: "总量",
            data: [820, 932, 901]
          },
          {
            name: "劳保用品成本",
            type: "line",
            stack: "总量",
            data: [820, 932, 901]
          },
          {
            name: "车辆成本",
            type: "line",
            stack: "总量",
            data: [820, 932, 901]
          },
          {
            name: "其他成本",
            type: "line",
            stack: "总量",
            data: [820, 932, 901]
          }
        ]
      };

      lineChart.setOption(option);
    }
  }
};
</script>

<style></style>
