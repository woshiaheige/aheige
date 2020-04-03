<template>
  <a-card :bordered="false" class="device" title="仪器汇总">
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="period" slot-scope="period, row">
        <span>{{ row.startTime }}</span
        >至<span>{{ row.endTime }}</span>
      </span>
      <span slot="action" slot-scope="row">
        <a @click="toDeviceDetail(row)">查看</a>
        <a-divider type="vertical" />
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      total: 1,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "仪器名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "仪器编号",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "所属站点",
          dataIndex: "station",
          key: "station"
        },
        {
          title: "仪器类型",
          dataIndex: "instrumentType",
          key: "instrumentType"
        },
        {
          title: "录入时间",
          dataIndex: "recordTime",
          key: "recordTime"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          number: "",
          name: "哈希NH3-H分析仪",
          station: "务庄污水",
          instrumentType: "",
          recordTime: "2019-10-15"
        }
      ]
    };
  },
  methods: {
    toDeviceDetail() {
      this.$router.push({ path: "/report/device/detail" });
    },
    getTableData() {
      this.$api.report.getDeviceList().then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
