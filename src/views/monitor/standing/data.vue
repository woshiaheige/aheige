<template>
  <div>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">数据列表</div>
        <div class="extra">
          <a-form-model layout="inline">
            <a-form-model-item>
              <a-range-picker
                :allowClear="false"
                @change="onChange"
                format="YYYY-MM-DD"
                v-model="formInline.range"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-radio-group
                v-model="formInline.type"
                @change="getRealDataTitle"
              >
                <a-radio-button :value="1">实时数据</a-radio-button>
                <a-radio-button :value="2">分钟数据</a-radio-button>
                <a-radio-button :value="3">小时数据</a-radio-button>
                <a-radio-button :value="4">日数据</a-radio-button>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item style="float:right"
              ><a-select v-model="formInline.showType" @change="getTableData">
                <a-select-option value="data">数据</a-select-option>
                <a-select-option value="chart">图表</a-select-option>
              </a-select></a-form-model-item
            >
          </a-form-model>
        </div>
      </div>
      <div v-if="formInline.showType == 'data'">
        <a-table
          bordered
          :loading="loading"
          :rowKey="(record, index) => index"
          size="middle"
          :columns="columns"
          :dataSource="tableData"
          v-margin:top="16"
          :pagination="false"
        >
          <span slot="action" slot-scope="row">
            <a @click="toMonitorData(row)">监测数据</a>
          </span>
        </a-table>
        <a-pagination
          size="small"
          v-margin:top="16"
          showSizeChanger
          :pageSize.sync="pageSize"
          :showTotal="total => `共 ${total} 条`"
          :current="current"
          @change="pagechange"
          @showSizeChange="sizechange"
          :total="total"
        />
      </div>
    </a-card>
    <a-card
      :bordered="false"
      v-margin:top="16"
      v-if="formInline.showType == 'chart'"
    >
      <div class="card-header">
        <div class="title">数据图表</div>
        <!-- 因子列表下拉框 -->
        <div class="extra">
          <a-select :defaultValue="columnsValue" @change="onColumnsChange">
            <a-select-option
              v-for="item in columnsList"
              :value="item.value"
              :key="item.value"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </div>
      </div>
      <ve-line
        v-if="chartData.rows.length > 0"
        :data="chartData"
        :legend-visible="false"
        :settings="settings"
      ></ve-line>
      <a-empty v-if="chartData.rows.length == 0" :image="simpleImage" />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allTableData: [],
      columnsValue: "",
      columnsName: "",
      dateFormat: "",
      columnsList: [],
      loading: false,
      pointId: "",
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [],
      formInline: {
        range: [
          this.$moment(this.$moment().format("YYYY-MM-DD") + " 00:00:00"),
          this.$moment(this.$moment().format("YYYY-MM-DD") + " 23:59:59")
        ],
        pointId: "",
        type: 1,
        showType: "data"
      },
      chartData: {
        columns: ["dateTime", "value"],
        rows: []
      }
    };
  },
  computed: {
    settings() {
      return {
        digit: 4,
        xAis: {
          inverse: true
        },
        labelMap: {
          value: this.columnsName
        }
      };
    }
  },

  mounted() {
    this.setPointId();
    this.getRealDataTitle();
  },
  methods: {
    setCharData() {
      let tempData = [];
      let columnsValue = this.columnsValue;
      this.allTableData.forEach(element => {
        if (this.formInline.type == 1) {
          tempData.push({
            dateTime: element["dataTime"],
            value: element[columnsValue]["Rtd"]
          });
        } else {
          tempData.push({
            dateTime: element["dataTime"],
            value: Number(element[columnsValue]["Avg"])
          });
        }
      });
      tempData = tempData.reverse();
      this.chartData.rows = tempData;
    },
    onColumnsChange(value, option) {
      this.columnsValue = value;
      for (let i = 0; i < this.columnsList.length; i++) {
        if (this.columnsList[i].value == option.key) {
          this.columnsName = this.columnsList[i].name;
        }
      }
      this.setCharData();
    },
    //时间改变事件
    onChange(date, dateString) {
      if (
        this.$moment(
          dateString[1] + " 23:59:59",
          "YYYY-MM-DD HH:mm:ss"
        ).valueOf() >
        this.$moment(dateString[0] + " 23:59:59", "YYYY-MM-DD HH:mm:ss")
          .add(2, "days")
          .valueOf()
      ) {
        this.formInline.range[1] = this.$moment(
          dateString[0] + " 23:59:59",
          "YYYY-MM-DD HH:mm:ss"
        ).add(2, "days");
      } else {
        this.formInline.range[1] = date[1];
      }
      this.getTableData();
    },
    //设置pointid
    setPointId() {
      this.formInline.pointId = this.$route.query.id;
    },
    //获取实时数据
    getTableData() {
      this.loading = true;
      let data = {
        page: this.current,
        size: this.formInline.showType == "data" ? this.pageSize : 10000,
        pointId: this.formInline.pointId,
        beginTime: this.formInline.range[0].format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.formInline.range[1].format("YYYY-MM-DD HH:mm:ss"),
        type: this.formInline.type
      };
      this.$api.monitor
        .getRealData(data)
        .then(res => {
          if (this.formInline.showType == "data") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          } else {
            let _data = res.data.data.list || [];
            this.allTableData = _data;
            this.setCharData();
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //获取实时数据表头
    getRealDataTitle() {
      this.current = 1;
      let data = {
        cn: this.formInline.type
      };
      let path = this.formInline.pointId;
      this.$api.monitor
        .getRealDataTitle(data, path)
        .then(res => {
          if (res.data.state == 0) {
            let _data = res.data.data || [];
            let tempColumns = [];
            let temp = [];
            _data.forEach(element => {
              if (element.title == "时间") {
                temp.push({
                  title: element.title,
                  dataIndex: element.field,
                  key: element.field,
                  width: 200,
                  align: "center"
                });
              } else {
                if (this.formInline.type == 1) {
                  temp.push({
                    title: element.title,
                    dataIndex: element.field,
                    key: element.field,
                    align: "center",
                    customRender: (text, row) => {
                      if (row[element.field].Rtd) {
                        return row[element.field].Rtd;
                      } else {
                        return "-";
                      }
                    }
                  });
                  tempColumns.push({
                    name: element.title,
                    value: element.field
                  });
                } else {
                  temp.push({
                    title: element.title,
                    dataIndex: element.field,
                    key: element.field,
                    align: "center",
                    customRender: (text, row) => {
                      if (row[element.field].Avg) {
                        return row[element.field].Avg;
                      } else {
                        return "-";
                      }
                    }
                  });
                  tempColumns.push({
                    name: element.title,
                    value: element.field
                  });
                }
              }
            });
            this.columns = temp;
            this.columnsList = tempColumns;
            this.columnsValue = tempColumns[0].value || "";
            this.columnsName = tempColumns[0].name || "";
          }
        })
        .then(() => {
          this.getTableData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
