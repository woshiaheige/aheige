<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-select
            v-model="list.enterpriseId"
            placeholder="请选择"
            v-width="150"
            showSearch
            :filterOption="filterOptions"
            @change="changeEnterprise"
          >
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option
              v-for="item in enterPriseOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="站点名称">
          <a-select
            v-model="list.pointId"
            placeholder="请选择"
            v-width="150"
            showSearch
            :filterOption="filterOptions"
            :disabled="isDisabled"
            @change="getData"
          >
            <a-select-option
              v-for="item in pointOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="出库时间">
          <a-range-picker
            format="YYYY-MM"
            :mode="mode"
            :value="list.range"
            @panelChange="handlePanelChange"
            @change="handleChange"
          />
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
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
        <template slot="footer">
          合计
          <span style="float: right">￥{{ costCount }}</span>
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
        <div class="title">成本统计分析</div>
      </div>
      <div class="loading" v-if="pieLoading">
        <a-spin size="large" />
      </div>
      <div v-if="!isPieEmpty">
        <div id="pieChart" style="width:50%; height: 400px; float:left;"></div>
        <div id="barChart" style="width:50%; height: 400px;float:right;"></div>
      </div>
      <a-empty v-else :image="simpleImage" />
    </a-card>
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
      list: {
        enterpriseId: "",
        pointId: undefined,
        range: []
      },
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
      pieLoading: false,
      isLineEmpty: false,
      lineLoading: false,
      dateList: [],
      isDisabled: true,
      enterPriseOptions: [],
      pointOptions: [],
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "站点名称",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "设备成本（元）",
          dataIndex: "goodsName",
          key: "goodsName"
        },
        {
          title: "实验室设备（元）",
          dataIndex: "brand",
          key: "brand"
        },
        {
          title: "部件成本（元）",
          dataIndex: "model",
          key: "model"
        },
        {
          title: "试剂成本（元）",
          dataIndex: "stockCount",
          key: "stockCount"
        },
        {
          title: "标气成本（元）",
          dataIndex: "unit",
          key: "unit"
        },
        {
          title: "劳保用品（元）",
          dataIndex: "price",
          key: "price",
          customRender: text => {
            if (text) {
              return "￥" + text;
            } else {
              return "-";
            }
          }
        },
        {
          title: "其他成本（元）",
          dataIndex: "gmtCreate",
          key: "gmtCreate"
        },
        {
          title: "总价（元）",
          dataIndex: "totalPrices",
          key: "totalPrices",
          customRender: text => {
            if (text) {
              return "￥" + text;
            } else {
              return "-";
            }
          }
        }
      ],
      tableData: [],
      costCount: 0
    };
  },
  mounted() {
    this.reset();
  },
  methods: {
    handleChange(value) {
      this.list.range = value;
    },
    handlePanelChange(value, mode) {
      this.list.range = value;
      this.mode = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
      let data = {
        beginTime: this.$moment(this.list.range[0]).format("YYYY-MM"),
        endTime: this.$moment(this.list.range[1]).format("YYYY-MM")
      };
      this.validTime(data);
    },
    reset() {
      let data = this.getLast3Month();
      this.list.range = [this.$moment(data[0]), this.$moment(data[1])];
      this.getData();
    },
    getData() {
      let data = {
        beginTime: this.$moment(this.list.range[0]).format("YYYY-MM"),
        endTime: this.$moment(this.list.range[1]).format("YYYY-MM")
      };
      if (!this.validTime(data)) {
        return;
      }
      this.getLine(data);
      this.getPie(data);
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
              for (var n in result) {
                data.forEach(item => {
                  if (result[n].type == item.key) {
                    item.value = result[n].totalAmount;
                  }
                });
              }
              // 处理排序：从大到小
              var temp;
              for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                  if (data[i].value > data[j].value) {
                    temp = data[j];
                    data[j] = data[i];
                    data[i] = temp;
                  }
                }
              }
              this.drawPieChart(data);
              this.drawBarChart(data);
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
    //条状图
    drawBarChart(data) {
      const legend = [];
      const _data = [];
      data.forEach(item => {
        legend.push(item.name);
        _data.push(item.value);
      });
      let barChart = this.$echarts.init(document.getElementById("barChart"));

      this.$nextTick(() => {
        barChart.resize();
      });

      window.addEventListener("resize", () => {
        barChart.resize();
      });
      let option = {
        tooltip: {
          trigger: "item" //悬浮提示框不显示
        },
        grid: {
          //绘图区调整
          x: 120, //左留白
          y: 10, //上留白
          x2: 50 //右留白
        },
        xAxis: [
          {
            show: false,
            type: "value",
            boundaryGap: [0, 0],
            position: "top"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: legend,
            axisLine: { show: false }, //坐标轴
            axisTick: [
              {
                //坐标轴小标记
                show: false
              }
            ],

            axisLabel: {
              textStyle: {
                fontSize: 14
              }
            }
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            tooltip: { show: false },
            barMinHeight: 30, //最小柱高
            barWidth: 25, //柱宽度
            data: _data,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                //柱状图颜色
                color: function(params) {
                  console.log(params);
                  // build a color map as your need.
                  var colorList = [
                    "#C23531",
                    "#2F4554",
                    "#61A0A8",
                    "#D48265",
                    "#91C7AE",
                    "#749F83",
                    "#CA8622"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true, //显示文本
                  position: "right", //数据值位置
                  textStyle: {
                    color: "#000",
                    fontSize: "14"
                  }
                }
              }
            }
          }
        ]
      };

      barChart.setOption(option);
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
    },
    //企业下拉
    getEnterprise() {
      this.$api.common.selectEnterprise().then(res => {
        if (res.data.state == 0) {
          this.enterPriseOptions = res.data.data;
        }
      });
    },
    changeEnterprise(value) {
      this.isDisabled = true;
      this.list.pointId = undefined;
      if (value) {
        this.isDisabled = false;
        this.getPoint(value);
      }
    },
    //站点下拉
    getPoint(value) {
      this.$api.common
        .selectStationByEnterpriseId({
          enterpriseId: value
        })
        .then(res => {
          if (res.data.state == 0) {
            this.pointOptions = res.data.data;
          }
        });
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
