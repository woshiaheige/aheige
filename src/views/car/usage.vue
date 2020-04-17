<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title">车辆使用记录</span>
    <a-table
      size="middle"
      :columns="columns"
      :loading="loading"
      rowKey="id"
      :dataSource="tableData"
      :pagination="false"
      align="center"
      v-margin:top="16"
    >
      <a slot="check" slot-scope="row">
        <a @click="goDetail(row)">查看</a>
      </a>
    </a-table>
    <a-pagination
      size="small"
      v-margin:top="16"
      showSizeChanger
      :total="total"
      :showTotal="total => `共 ${total} 条`"
      :current="current"
      @change="pagechange"
      @showSizeChange="sizechange"
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
      pagesize: 10,
      loading: false,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          }
        },
        {
          title: "车辆",
          dataIndex: "number"
        },
        {
          title: "行驶距离",
          dataIndex: "driveDistance"
        },
        {
          title: "平均车速",
          dataIndex: "avgSpeed"
        },
        {
          title: "最大车速",
          dataIndex: "maxSpeed"
        },
        {
          title: "驾驶时间",
          dataIndex: "gmtDrive"
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
      this.loading = true;
      let params = {
        pagesize: this.pagesize,
        page: this.current
      };
      this.$api.car
        .manageVehicleUse(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goDetail(row) {
      this.$router.push({
        path: "/car/usage/detail",
        query: { vehicleId: row.id }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
