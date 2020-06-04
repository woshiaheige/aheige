<template>
  <div>
    <a-card :bordered="false" v-margin:top="16">
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
  props: {
    value: Object
  },
  data() {
    return {
      legend: [],
      isPieEmpty: false,
      pieLoading: false
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
    this.getPieData();
  },
  methods: {
    getPieData(temp) {
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
      this.isPieEmpty = false;
      this.pieLoading = true;
      this.$api.cost
        .getTypeChartPie(data)
        .then(res => {
          if (res.data.state == 0) {
            this.pieLoading = false;
            let result = res.data.data || [];
            let data = [];
            if (result.length > 0) {
              result.forEach(item => {
                let temp = {};
                temp.value = item.total_prices;
                temp.name = item.goods_name;
                data.push(temp);
                this.legend.push(item.goods_name);
              });
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
          data: this.legend
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
