<template>
  <div>
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">完成情况考评</div>
      </div>
      <ve-histogram :data="chartData" :extend="chartExtend"></ve-histogram>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">运维活动统计次数走势分析</div>
      </div>
      <div id="lineChart" style="width:100%; height: 400px"></div>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">运维活动统计</div>
      </div>
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
        rows: []
      },
      chartExtend: {
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        }
      },
      schemeList: [],
      timeList: [],
      lineData: []
    };
  },
  mounted() {
    console.log(
      this.$moment(this.$route.query.beginTime)
        .date(1)
        .valueOf()
    );
    this.getAssessmentDetail();
  },
  methods: {
    //饼图的数据是从列表带过来的
    drawPieChart() {
      let pieChart = this.$echarts.init(document.getElementById("pieChart"));

      this.$nextTick(() => {
        pieChart.resize();
      });

      window.addEventListener("resize", () => {
        pieChart.resize();
      });
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.schemeList
        },
        series: [
          {
            name: "运维活动统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: JSON.parse(this.$route.query.chartData),
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
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.schemeList,
          type: "scroll"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "time",
          min:
            this.$route.query.type == 1
              ? this.$moment(this.$route.query.beginTime)
                  .date(1)
                  .valueOf()
              : this.$route.query.type == 2
              ? this.$moment(this.$route.query.beginTime)
                  .date(1)
                  .valueOf()
              : this.$moment(this.$route.query.beginTime)
                  .month(0)
                  .date(1)
                  .valueOf(),
          max:
            this.$route.query.type == 1
              ? this.$moment(this.$route.query.beginTime)
                  .endOf("month")
                  .valueOf()
              : this.$route.query.type == 2
              ? this.$moment(this.$route.query.endTime)
                  .endOf("month")
                  .valueOf()
              : this.$moment(this.$route.query.beginTime)
                  .month(11)
                  .date(31)
                  .valueOf(),
          boundaryGap: false,
          interval:
            this.$route.query.type == 1
              ? 3600 * 24 * 1000
              : this.$route.query.type == 2
              ? 3600 * 24 * 1000 * 4
              : 3600 * 24 * 1000 * 31
        },
        yAxis: {
          type: "value"
        },
        series: this.lineData
      };

      lineChart.setOption(option);
    },
    async getAssessmentDetail() {
      let data = {
        flag: this.$route.query.type,
        userId: this.$route.query.memberId,
        beginTime: this.$route.query.beginTime,
        endTime: this.$route.query.endTime ? this.$route.query.endTime : ""
      };

      await this.$api.assessment.getAssessmentDetail(data).then(res => {
        if (res.data.state == 0) {
          for (let key in res.data.data[0].isComplete) {
            this.chartData.rows.push({
              运维项目: key,
              已完成: res.data.data[0].isComplete[key][0],
              未完成: res.data.data[0].isComplete[key][1]
            });

            this.schemeList.push(key);
          }

          for (let key in res.data.data[0].statistic) {
            let singleData = [];
            if (res.data.data[0].statistic[key] !== null) {
              res.data.data[0].statistic[key].forEach(item => {
                singleData.push([
                  item.completeTimeStamp * 1000,
                  item.countTask
                ]);
              });
            }

            this.lineData.push({
              name: key,
              type: "line",
              data: singleData
            });
          }
        }
      });

      this.drawPieChart();
      this.drawLineChart();
    }
  }
};
</script>

<style></style>
