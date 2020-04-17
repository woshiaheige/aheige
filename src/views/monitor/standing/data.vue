<template>
  <div>
    <a-card :bordered="false" v-margin:bottom="28">
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <a-card :bordered="false">
      <span slot="title">
        实时数据
      </span>

      <a-table
        :loading="loading"
        :rowKey="(record, index) => index"
        size="middle"
        bordered
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
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pointId: "",
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [],
      formInline: {
        beginTime: "2019-12-03 00:00:00",
        endTime: "2019-12-03 23:59:59",
        pointId: ""
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
    },
    //设置pointid
    setPointId() {
      this.formInline.pointId = this.$route.params.row.pointId;
    },
    //获取实时数据
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pageSize,
        pointId: this.formInline.pointId,
        startTime: this.formInline.beginTime,
        endTime: this.formInline.endTime
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
            let temp = [];
            _data.forEach(element => {
              if (element.title == "时间") {
                temp.push({
                  title: element.title,
                  dataIndex: element.field,
                  key: element.field,
                  align: "center"
                });
              } else {
                temp.push({
                  title: element.title,
                  dataIndex: element.field,
                  key: element.field,
                  align: "center",
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
