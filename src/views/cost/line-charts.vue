<template>
  <div>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">成本趋势分析</div>
      </div>
      <div class="loading" v-if="lineLoading">
        <a-spin size="large" />
      </div>
      <div
        v-if="!isLineEmpty"
        id="lineChart"
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
      isLineEmpty: false,
      lineLoading: false,
      dateList: []
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
      this.getLine(data);
    },
    //曲线图
    getLine(data) {
      this.isLineEmpty = false;
      this.lineLoading = true;
      this.$api.cost
        .getChartLine(data)
        .then(res => {
          if (res.data.state == 0) {
            this.lineLoading = false;
            let result = res.data.data;
            if (result.length > 0) {
              let legend = [this.changeText(Number(result[0].type))];
              let temp = [
                {
                  type: "line",
                  name: this.changeText(Number(result[0].type)),
                  data: [],
                  // stack: "总量",
                  key: result[0].type
                }
              ];
              result.forEach(item => {
                let isHas = true;
                temp.forEach(element => {
                  if (element.key == item.type) {
                    element.data.push(item.totalAmount);
                    isHas = false;
                  }
                });
                if (isHas) {
                  legend.push(this.changeText(Number(item.type)));
                  temp.push({
                    type: "line",
                    name: this.changeText(Number(item.type)),
                    data: [item.totalAmount],
                    key: item.type
                  });
                }
              });
              this.drawLineChart(temp, legend);
            } else {
              this.isLineEmpty = true;
            }
          }
        })
        .catch(() => {
          this.isLineEmpty = true;
          this.lineLoading = false;
        });
    },
    drawLineChart(data, legend) {
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
          data: legend
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
          data: this.dateList
        },
        yAxis: {
          type: "value"
        },
        series: data
      };

      lineChart.setOption(option);
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
