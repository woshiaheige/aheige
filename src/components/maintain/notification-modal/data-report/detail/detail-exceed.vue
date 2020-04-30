<template>
  <div>
    <a-table
      size="middle"
      :loading="loading"
      :rowKey="(record, index) => index"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
    >
      <template slot="dataType" slot-scope="dataType">
        <a-tag color="green" v-if="dataType == '2051'">分钟数据</a-tag>
        <a-tag color="blue" v-if="dataType == '2061'">小时数据</a-tag>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      columns: [
        {
          title: "因子名称",
          dataIndex: "divisorName",
          key: "divisorName"
        },
        {
          title: "实时值",
          dataIndex: "rtd",
          key: "rtd"
        },
        {
          title: "上限值",
          dataIndex: "floorval",
          key: "floorval",
          customRender: (text, row) => Number(row.floorval).toFixed(4)
        },
        {
          title: "下限值",
          dataIndex: "ceilval",
          key: "ceilval",
          customRender: (text, row) => Number(row.ceilval).toFixed(4)
        },
        {
          title: "数据类型",
          dataIndex: "dataType",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "dataType" }
        },
        {
          title: "超标时间",
          dataIndex: "dateTime",
          key: "dateTime",
          width: 200,
          align: "center"
        }
      ]
    };
  },
  methods: {
    getTableData() {
      let notification = this.$bus.$data.notification;
      this.loading = true;
      let data = {
        beginTime: notification.beginTime,
        endTime: notification.endTime,
        mn: notification.mn
      };
      this.$api.maintain
        .getReportPushDataRateWarnData(data)
        .then(res => {
          if (res.data.state == 0) {
            this.tableData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.$bus.$on("todoSth", function(params) {
      //获取传递的参数并进行操作
      //todo something
      console.log(params, 5555);
    });
  }
};
</script>
