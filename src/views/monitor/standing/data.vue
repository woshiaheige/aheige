<template>
  <div>
    <a-card>
      <a-form-model layout="inline">
        <a-form-model-item label="时间范围">
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item label="数据类型">
          <a-radio-group v-model="formInline.type">
            <a-radio-button value="1">实时数据</a-radio-button>
            <a-radio-button value="2">分钟数据</a-radio-button>
            <a-radio-button value="3">小时数据</a-radio-button>
            <a-radio-button value="4">日数据</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item style="float:right"
          ><a-select v-model="formInline.showType">
            <a-select-option value="data">数据</a-select-option>
            <a-select-option value="chart">图表</a-select-option>
          </a-select></a-form-model-item
        >
        <a-form-model-item style="float:right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card
      :bordered="false"
      v-margin:top="16"
      v-if="formInline.showType == 'data'"
    >
      <div class="card-header">
        <div class="title">数据列表</div>
        <div class="extra">
          <a-radio-group>
            <a-radio-button value="1">实时数据</a-radio-button>
            <a-radio-button value="2">分钟数据</a-radio-button>
            <a-radio-button value="3">小时数据</a-radio-button>
            <a-radio-button value="4">日数据</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <a-table
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
        :pageSize.sync="pagesize"
        :showTotal="total => `共 ${total} 条`"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
      <div v-if="formInline.showType == 'chart'">
        <ve-line :data="chartData"></ve-line>
      </div>
    </a-card>
    <a-card
      :bordered="false"
      v-margin:top="16"
      v-if="formInline.showType == 'chart'"
    >
      <div class="card-header">
        <div class="title">数据图表</div>
        <div class="extra">
          <a-select :defaultValue="columnsList[0].name">
            <a-select-option
              v-for="item in columnsList"
              :value="item.value"
              :key="item.value"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </div>
      </div>
      <ve-line :data="chartData"></ve-line>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnsList: [
        { name: "一氧化碳", value: "1" },
        { name: "二氧化碳", value: "2" },
        { name: "平均温度", value: "3" },
        { name: "氧气含量", value: "4" }
      ],
      loading: false,
      pointId: "",
      pagesize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [],
      formInline: {
        beginTime: "2019-12-03 00:00:00",
        endTime: "2019-12-03 23:59:59",
        pointId: "",
        type: "1",
        showType: "data"
      },
      chartData: {
        columns: ["时间", "一氧化碳"],
        rows: [
          {
            时间: "2020-04-03 14:24:09",
            一氧化碳: 40
          },
          {
            时间: "2020-04-03 14:23:00",
            一氧化碳: 36
          },
          {
            时间: "2020-04-03 14:22:00",
            一氧化碳: 25
          },
          {
            时间: "2020-04-03 14:21:59",
            一氧化碳: 28
          },
          {
            时间: "2020-04-03 14:21:49",
            一氧化碳: 37
          },
          {
            时间: "2020-04-03 14:21:39",
            一氧化碳: 42
          },
          {
            时间: "2020-04-03 14:21:29",
            一氧化碳: 51
          },
          {
            时间: "2020-04-03 14:21:19",
            一氧化碳: 41
          },
          {
            时间: "2020-04-03 14:21:09",
            一氧化碳: 45
          },
          {
            时间: "2020-04-03 14:21:00",
            一氧化碳: 46
          }
        ]
      }
    };
  },
  mounted() {
    this.setPointId();
    this.getRealDataTitle();
    this.getTableData();
  },
  methods: {
    //时间改变事件
    onChange(date, dateString) {
      this.formInline.beginTime = dateString[0] + " 00:00:00";
      this.formInline.endTime = dateString[1] + " 23:59:59";
      this.onSubmit();
    },
    //设置pointid
    setPointId() {
      this.formInline.pointId = this.$route.query.id;
    },
    //获取实时数据
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pagesize,
        pointId: this.formInline.pointId,
        startTime: this.formInline.beginTime,
        endTime: this.formInline.endTime,
        type: this.formInline.type
      };
      this.$api.monitor
        .getRealData(data)
        .then(res => {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
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
      let data = {
        cn: 1
      };
      let path = this.formInline.pointId;
      this.$api.monitor
        .getRealDataTitle(data, path)
        .then(res => {
          if (res.data.state == 0) {
            let _data = res.data.data || [];
            let temp = [
              {
                align: "center",
                title: "序号",
                width: 100,
                customRender: (_, __, index) => {
                  return (
                    <span>
                      {index + (this.current - 1) * this.pagesize + 1}
                    </span>
                  );
                }
              }
            ];
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
                  customRender: (text, row) => `${row[element.field].rtd}`
                });
              }
            });
            this.columns = temp;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
