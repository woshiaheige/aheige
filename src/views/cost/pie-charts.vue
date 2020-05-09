<template>
  <div>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">成本统计分析</div>
      </div>
      <div class="loading" v-if="pieLoading">
        <a-spin size="large" />
      </div>
      <div
        v-if="!isPieEmpty"
        id="pieChart"
        style="width:100%; height: 400px"
      ></div>
      <a-empty v-else :image="simpleImage" />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: ["month", "month"],
      value: [],
      pieData: [
        { value: 0, name: "设备成本", key: 1 },
        { value: 0, name: "实验室设备成本", key: 2 },
        { value: 0, name: "部件成本", key: 3 },
        { value: 0, name: "试剂成本", key: 4 },
        { value: 0, name: "标气成本", key: 5 },
        { value: 0, name: "劳保用品成本", key: 6 },
        { value: 0, name: "其他成本", key: 7 }
      ],
      isPieEmpty: false,
      pieLoading: false
    };
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      let data = this.getLast3Month();
      this.value = [this.$moment(data[0]), this.$moment(data[1])];
      this.getData();
    },
    getData() {
      let data = {
        beginTime: this.$moment(this.value[0]).format("YYYY-MM"),
        endTime: this.$moment(this.value[1]).format("YYYY-MM")
      };
      this.getPie(data);
    },
    //饼状图
    getPie(data) {
      this.isPieEmpty = false;
      this.pieLoading = true;
      this.$api.cost
        .getChartPie(data)
        .then(res => {
          if (res.data.state == 0) {
            this.pieLoading = false;
            let result = res.data.data || [];
            let data = JSON.parse(JSON.stringify(this.pieData));
            if (result.length > 0) {
              for (var i in result) {
                data.forEach(item => {
                  if (result[i].type == item.key) {
                    item.value = result[i].totalAmount;
                  }
                });
              }
              this.drawPieChart(data);
            } else {
              this.isPieEmpty = true;
            }
          }
        })
        .catch(() => {
          this.isPieEmpty = true;
          this.pieLoading = false;
        });
    },
    drawPieChart(data) {
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
            data: data,
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
    changeText(key) {
      switch (key) {
        case 1:
          return "设备成本";
        case 2:
          return "实验室设备成本";
        case 3:
          return "部件成本";
        case 4:
          return "试剂成本";
        case 5:
          return "标气成本";
        case 6:
          return "劳保用品成本";
        case 7:
          return "车辆成本";
        default:
          return "其他成本";
      }
    },
    //获取当前月的前二个月
    getLast3Month() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1; //0-11表示1-12月
      var dateObj = [];
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      dateObj[1] = year + "-" + month;
      if (parseInt(month) == 1) {
        //如果是1月份，则取上一年的11月份
        dateObj[0] = parseInt(year) - 1 + "-11";
      } else if (parseInt(month) == 2) {
        dateObj[0] = parseInt(year) - 1 + "-12";
      } else if (parseInt(month) <= 10) {
        dateObj[0] = year + "-0" + (parseInt(month) - 2);
      } else {
        dateObj[0] = year + "-" + (parseInt(month) - 2);
      }
      return dateObj;
    },
    //获取区域间的所有月份
    getMonthBetween(start, end) {
      var result = [];
      var s = start.split("-");
      var e = end.split("-");
      var min = new Date();
      var max = new Date();
      min.setFullYear(s[0], s[1]);
      max.setFullYear(e[0], e[1]);
      var curr = min;
      while (curr <= max) {
        var month = curr.getMonth();
        var str = curr.getFullYear() + "-" + month;
        var y = curr.getFullYear() + "-0";
        if (str == y) {
          str = curr.getFullYear() + "-12";
        }
        result.push(str);
        curr.setMonth(month + 1);
      }
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
.loading {
  text-align: center;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>
