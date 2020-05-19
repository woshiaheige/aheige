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
            <a-form-model-item style="float:right">
              <a-radio-group v-model="formInline.showType" @change="onSubmit">
                <a-radio-button value="data">数据</a-radio-button>
                <a-radio-button value="chart">图表</a-radio-button>
              </a-radio-group>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
      <div v-if="formInline.showType == 'data'">
        <a-table
          :loading="loading"
          :rowKey="(record, index) => index"
          size="middle"
          :columns="columns"
          :dataSource="tableData"
          v-margin:top="16"
          :pagination="false"
        >
          <span
            v-for="item in columns.filter(columnItem => {
              return columnItem.key !== 'dataTime';
            })"
            :slot="item.key"
            :key="item.key"
            slot-scope="text, row"
          >
            <div v-if="row[item.key].Rtd || row[item.key].Avg">
              <div v-if="formInline.type === 3">
                <span v-color="'#CB343F'" v-if="row[item.key].Flag === 'T'"
                  >{{ row[item.key].Avg }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      <p>超标</p>
                      <p>上限：{{ row[item.key].ceilval }}</p>
                      <p>下限：{{ row[item.key].floorval }}</p>
                    </template>
                    <a-icon
                      type="question-circle"
                      theme="filled"
                      style="color: rgba(0, 0, 0, 0.25);"
                    />
                  </a-tooltip>
                </span>
                <span v-else-if="row[item.key].Flag === 'N'">{{
                  row[item.key].Avg
                }}</span>
                <span v-color="'#EBBF0E'" v-else
                  >{{ row[item.key].Avg }}
                  <a-tooltip placement="top">
                    <template slot="title">
                      <p v-if="row[item.key].Flag == 'F'">
                        在线监控（监测）仪器仪表停运
                      </p>
                      <p v-if="row[item.key].Flag == 'M'">
                        在线监控（监测）仪器仪表处于维护期间产生的数据
                      </p>
                      <p v-if="row[item.key].Flag == 'S'">手工输入的设定值</p>
                      <p v-if="row[item.key].Flag == 'D'">
                        在线监控（监测）仪器仪表故障
                      </p>
                      <p v-if="row[item.key].Flag == 'C'">
                        在线监控（监测）仪器仪表处于校准状态
                      </p>
                      <p v-if="row[item.key].Flag == 'B'">
                        在线监控（监测）仪器仪表与数采仪通讯异常
                      </p>
                    </template>
                    <a-icon
                      type="question-circle"
                      theme="filled"
                      style="color: rgba(0, 0, 0, 0.25);"
                    />
                  </a-tooltip>
                </span>
              </div>
              <div v-else-if="formInline.type === 1">
                <span>{{ row[item.key].Rtd }}</span>
              </div>
              <div v-else>
                <span>{{ row[item.key].Avg }}</span>
              </div>
            </div>
            <div v-else>
              <span>-</span>
            </div>
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
      </div>
      <ve-line
        v-if="chartData.rows.length > 0"
        :data="chartData"
        :settings="settings"
        :extend="chartExtend"
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
      columnsName: {},
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
        columns: ["dateTime"],
        rows: []
      },
      chartExtend: {
        series: {
          smooth: false
        }
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
        labelMap: this.columnsName
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
      this.chartData.columns = ["dateTime"];
      this.allTableData.forEach(element => {
        if (this.formInline.type == 1) {
          let rowData = {
            dateTime: element["dataTime"]
          };
          for (let object in element) {
            if (object !== "dataTime" && object !== "overFlag") {
              if (element[object]["Rtd"])
                rowData[object] = element[object]["Rtd"];
            }
          }
          tempData.push(rowData);
        } else {
          let rowData = {
            dateTime: element["dataTime"]
          };
          for (let object in element) {
            if (object !== "dataTime" && object !== "overFlag") {
              if (element[object]["Avg"])
                rowData[object] = element[object]["Avg"];
            }
          }
          tempData.push(rowData);
        }
      });

      for (let object in this.allTableData[0]) {
        if (object !== "dataTime" && object !== "overFlag")
          this.chartData.columns.push(object);
      }

      tempData = tempData.reverse();
      this.chartData.rows = tempData;
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
                temp.push({
                  title: element.title,
                  dataIndex: element.field,
                  key: element.field,
                  align: "center",
                  scopedSlots: { customRender: element.field }
                });
                tempColumns.push({
                  name: element.title,
                  value: element.field
                });
              }
            });
            this.columns = temp;
            this.columnsList = tempColumns;
            console.log(this.columnsList);
            this.columnsList.forEach(item => {
              this.columnsName[item.value] = item.name;
            });
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
