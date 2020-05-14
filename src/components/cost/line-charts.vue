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
  props: {
    value: Object
  },
  data() {
    return {
      isLineEmpty: false,
      lineLoading: false,
      dateList: []
    };
  },
  computed: {
    listArr: {
      get() {
        return this.value;
      },
      set() {}
    }
  },
  mounted() {
    this.getLineData();
  },
  methods: {
    getLineData(temp) {
      let list = {};
      if (temp != undefined) {
        list = temp;
      } else {
        list = this.listArr;
      }
      let data = {
        beginTime: this.$moment(list.range[0]).format("YYYY-MM-DD"),
        endTime: this.$moment(list.range[1]).format("YYYY-MM-DD"),
        type: list.type,
        enterpriseId: list.enterpriseId,
        pointId: list.pointId || "",
        goodsId: list.goodsId
      };
      let that = this;
      this.isLineEmpty = false;
      this.lineLoading = true;
      this.dateList = [];
      this.$api.cost
        .getTypeChartLine(data)
        .then(res => {
          if (res.data.state == 0) {
            this.lineLoading = false;
            let result = res.data.data;
            if (result.length > 0) {
              let legend = [result[0].goods_name];
              let obj = [
                {
                  type: "line",
                  name: result[0].goods_name,
                  data: []
                  // stack: "总量"
                }
              ];
              result.forEach(item => {
                let isHas = true;
                obj.forEach(element => {
                  if (element.name == item.goods_name) {
                    if (!that.dateList.some(k => k == item.gmt_create)) {
                      that.dateList.push(item.gmt_create);
                    }
                    element.data.push(item.total_prices);
                    isHas = false;
                  }
                });
                if (isHas) {
                  legend.push(item.goods_name);
                  obj.push({
                    type: "line",
                    name: item.goods_name,
                    data: [item.total_prices]
                  });
                }
              });
              this.drawLineChart(obj, legend);
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
