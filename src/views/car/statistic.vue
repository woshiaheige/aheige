<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="统计时间">
          <a-range-picker
            format="YYYY-MM"
            :mode="mode"
            :value="value"
            @panelChange="handlePanelChange"
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item label="车牌号码">
          <a-select
            placeholder="请选择"
            v-model="list.vehicleId"
            showSearch
            style="width: 200px"
            :filterOption="filterOptions"
          >
            <a-select-option
              v-for="item in carOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.number }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="getData()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">列表</div>
      </div>
      <a-table
        rowKey="number"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
        <template slot="footer">
          <span style="float: right">合计{{ costCount }}元</span>
        </template>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :current="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">统计分析</div>
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
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">趋势分析</div>
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
      list: {
        vehicleId: undefined,
        beginTime: "",
        endTime: ""
      },
      carOptions: [],
      value: [],
      pieData: [
        { value: 0, name: "加油费", key: 1, nameMap: "sumFuelPayment" },
        { value: 0, name: "过路费", key: 2, nameMap: "sumTollsPayment" },
        { value: 0, name: "保险费", key: 3, nameMap: "sumInsurancePayment" },
        { value: 0, name: "年检费", key: 4, nameMap: "sumAifPayment" },
        {
          value: 0,
          name: "维修保养费",
          key: 5,
          nameMap: "sumMaintenancePayment"
        }
      ],
      lineData: [
        {
          type: "line",
          name: "加油费",
          data: [],
          key: "1",
          nameMap: "sumFuelPayment"
        },
        {
          type: "line",
          name: "过路费",
          data: [],
          key: "2",
          nameMap: "sumTollsPayment"
        },
        {
          type: "line",
          name: "保险费",
          data: [],
          key: "3",
          nameMap: "sumInsurancePayment"
        },
        {
          type: "line",
          name: "年检费",
          data: [],
          key: "4",
          nameMap: "sumAifPayment"
        }
      ],
      isPieEmpty: false,
      pieLoading: false,
      isLineEmpty: false,
      lineLoading: false,
      dateList: [],
      current: 1,
      tableData: [],
      pageSize: 10,
      total: 0,
      loading: false,
      costCount: 0,
      columns: [
        {
          title: "车牌号",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "车辆品牌",
          dataIndex: "model",
          key: "model"
        },
        {
          title: "加油费（元）",
          dataIndex: "sumFuelPayment",
          key: "sumFuelPayment"
        },
        {
          title: "过路费（元）",
          dataIndex: "sumTollsPayment",
          key: "sumTollsPayment"
        },
        {
          title: "保险费（元）",
          dataIndex: "sumInsurancePayment",
          key: "sumInsurancePayment"
        },
        {
          title: "年检费（元）",
          dataIndex: "sumAifPayment",
          key: "sumAifPayment"
        },
        {
          title: "维修保养费（元）",
          dataIndex: "sumMaintenancePayment",
          key: "sumMaintenancePayment"
        },
        {
          title: "共计（元）",
          dataIndex: "sumPayment",
          key: "sumPayment",
          customRender: text => {
            let contain = null;
            contain = !text ? 0 : text;
            return contain;
          }
        }
      ]
    };
  },
  mounted() {
    this.getAllCar();
    this.reset();
  },
  methods: {
    getAllCar() {
      this.$api.car.getAllCar().then(res => {
        if (res.data.state == 0) {
          this.carOptions = res.data.data;
        }
      });
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        vehicleId: this.list.vehicleId,
        payBeginTime: this.$moment(this.value[0])
          .startOf("month")
          .format("YYYY-MM-DD"),
        payEndTime: this.$moment(this.value[1])
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      this.loading = true;
      this.$api.car
        .assetVehicleTotalCost(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            let result = res.data.data;
            this.tableData = result.records.map(item => {
              item.sumPayment = (
                Number(item.sumFuelPayment) +
                Number(item.sumTollsPayment) +
                Number(item.sumInsurancePayment) +
                Number(item.sumAifPayment) +
                Number(item.sumMaintenancePayment)
              ).toFixed(2);
              return item;
            });
            this.total = Number(result.total);
            this.costCount = this.getCostCount();
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    getCostCount() {
      let costCount = 0;
      this.tableData.forEach(item => {
        costCount += Number(item.sumPayment);
      });
      return costCount.toFixed(2);
    },
    handleChange(value) {
      this.value = value;
    },
    handlePanelChange(value, mode) {
      this.value = value;
      this.mode = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
      let data = {
        beginTime: this.$moment(this.value[0]).format("YYYY-MM"),
        endTime: this.$moment(this.value[1]).format("YYYY-MM")
      };
      this.validTime(data);
    },
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
      if (!this.validTime(data)) {
        return;
      }
      this.list.beginTime = data.beginTime;
      this.list.endTime = data.endTime;
      this.getLine();
      this.getPie();

      this.getTableData();
    },
    validTime(data) {
      this.dateList = this.getMonthBetween(data.beginTime, data.endTime);
      if (data.beginTime == data.endTime) {
        this.$message.warn("不能选择同年同月，请重新选择时间");
        return false;
      }
      if (this.dateList.length > 12) {
        this.$message.warn("时间不能超过一年，请重新选择时间");
        return false;
      }
      return true;
    },
    //曲线图
    getLine() {
      this.isLineEmpty = false;
      this.lineLoading = true;
      let data = {
        page: this.current,
        size: this.pageSize,
        vehicleId: this.list.vehicleId,
        payBeginTime: this.$moment(this.value[0])
          .startOf("month")
          .format("YYYY-MM-DD"),
        payEndTime: this.$moment(this.value[1])
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      this.$api.car
        .analysisVehicleCost(data)
        .then(res => {
          if (res.data.state == 0) {
            this.lineLoading = false;
            let result = res.data.data;
            let data = JSON.parse(JSON.stringify(this.lineData));
            data = data.map(item => {
              //填充0
              item.data = new Array(this.dateList.length).fill(0);
              return item;
            });
            if (result.length > 0) {
              data.forEach(item => {
                for (var i in result) {
                  if (result[i].type == item.key) {
                    let dataIndex = this.dateList.findIndex(date => {
                      //对应月份填充相应值
                      return (
                        this.$moment(date).format("YYYY-MM") ==
                        this.$moment(result[i].gmtPayment).format("YYYY-MM")
                      );
                    });
                    item.data[dataIndex] = result[i][item.nameMap];
                  }
                }
              });
              this.drawLineChart(data);
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
    //饼状图
    getPie() {
      this.isPieEmpty = false;
      this.pieLoading = true;
      let data = {
        page: this.current,
        size: this.pageSize,
        vehicleId: this.list.vehicleId,
        payBeginTime: this.$moment(this.value[0])
          .startOf("month")
          .format("YYYY-MM-DD"),
        payEndTime: this.$moment(this.value[1])
          .endOf("month")
          .format("YYYY-MM-DD")
      };
      this.$api.car
        .countVehicleCost(data)
        .then(res => {
          if (res.data.state == 0) {
            this.pieLoading = false;
            let result = res.data.data || [];
            let data = JSON.parse(JSON.stringify(this.pieData));
            if (result.length > 0) {
              for (var i in result) {
                data.forEach(item => {
                  if (result[i].type == item.key) {
                    item.value = result[i][item.nameMap];
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
          data: ["加油费", "过路费", "保险费", "年检费", "维修保养费"]
        },
        series: [
          {
            name: "统计分析",
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
    drawLineChart(data) {
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
          data: ["加油费", "过路费", "保险费", "年检费", "维修保养费"]
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
          str = curr.getFullYear() - 1 + "-12";
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
