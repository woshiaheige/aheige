<template>
  <div>
    <a-table
      :loading="loading"
      size="middle"
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
      columns: [
        {
          title: "分钟数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "minOughtCount",
              key: "minOughtCount"
            },
            {
              title: "实收条数",
              dataIndex: "minRealCount",
              key: "minRealCount"
            },
            {
              title: "数据完整率",
              dataIndex: "minPro",
              key: "minPro"
            }
          ]
        },
        {
          title: "小时数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "hourOughtCount",
              key: "hourOughtCount"
            },
            {
              title: "实收条数",
              dataIndex: "hourRealCount",
              key: "hourRealCount"
            },
            {
              title: "数据完整率",
              dataIndex: "hourPro",
              key: "hourPro"
            }
          ]
        },
        {
          title: "日数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "dayOughtCount",
              key: "dayOughtCount"
            },
            {
              title: "实收条数",
              dataIndex: "dayRealCount",
              key: "dayRealCount"
            },
            {
              title: "数据完整率",
              dataIndex: "dayPro",
              key: "dayPro"
            }
          ]
        }
      ],
      tableData: []
    };
  },
  methods: {
    getTableData() {
      let notification = this.$bus.$data.notification;
      let params = {
        beginTime: notification.beginTime,
        endTime: notification.endTime,
        pointId: notification.pointId
      };
      this.$api.maintain.getReportPushDataRateDetails(params).then(res => {
        if (res.data.state == 0) {
          this.tableData = res.data.data;
        }
      });
    }
  }
};
</script>
>
