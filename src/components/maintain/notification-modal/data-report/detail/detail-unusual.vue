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
          dataIndex: "divisorName"
        },
        {
          title: "异常类型",
          dataIndex: "flag",
          customRender: text => {
            if (text == "F") {
              return "仪器仪表停运";
            } else if (text == "M") {
              return "仪器仪表处于维护期间产生的数据";
            } else if (text == "S") {
              return "手工输入的设定值";
            } else if (text == "D") {
              return "仪器仪表故障";
            } else if (text == "C") {
              return "仪器仪表处于校准状态";
            } else if (text == "T") {
              return "仪器仪表采样数值超过测量上限";
            } else if (text == "B") {
              return "仪器仪表与数采仪通讯异常";
            }
          }
        },

        {
          title: "异常值",
          dataIndex: "rtd"
        },
        {
          title: "异常时间",
          dataIndex: "dateTime",
          width: 200
        }
      ]
    };
  },
  mounted() {
    // this.getTableData();
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
        .getReportPushDataRateExData(data)
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
  }
};
</script>
