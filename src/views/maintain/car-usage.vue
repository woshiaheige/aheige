<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title">车辆使用记录</span>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      v-margin:top="16"
    >
      <a slot="check">
        <a>查看</a>
      </a>
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
  components: {},
  data() {
    return {
      current: 1,
      total: 0,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "驾驶时间",
          dataIndex: "time"
        },
        {
          title: "车辆",
          dataIndex: "carName"
        },
        {
          title: "行驶距离",
          dataIndex: "distance"
        },
        {
          title: "平均车速",
          dataIndex: "aveSpeed"
        },
        {
          title: "最大车速",
          dataIndex: "maxSpeed"
        },
        {
          title: "驾驶时长",
          dataIndex: "longTime"
        },
        {
          title: "可用状态",
          dataIndex: "status"
        },
        {
          title: "默认使用小组",
          dataIndex: "team"
        },
        {
          title: "行驶路径",
          key: "check",
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: []
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getCarList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
