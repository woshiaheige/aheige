<template>
  <a-card :bordered="false" class="remote" title="远程控制">
    <a-table
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="gmtCreate" slot-scope="gmtCreate">
        {{ $moment(gmtCreate).format("YYYY-MM-DD hh:mm:ss") }}
      </span>
      <span slot="state" slot-scope="state">
        {{ state }}
      </span>
      <span slot="action" slot-scope="row">
        <a-button @click="row">重启</a-button>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      total: 1,
      visible: false,
      loading: true,
      pagesize: 10,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order",
          customRender: (_, __, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          }
        },
        {
          title: "所属仪器",
          dataIndex: "instrumentName",
          key: "instrumentName"
        },
        {
          title: "所属站点",
          dataIndex: " pointName",
          key: " pointName"
        },
        {
          title: "状态",
          dataIndex: "state",
          key: "state",
          scopedSlots: { customRender: "state" }
        },
        {
          title: "软件版本",
          dataIndex: "softwareVersion",
          key: "softwareVersion"
        },
        {
          title: "硬件版本",
          dataIndex: "hardwareVersion",
          key: "hardwareVersion"
        },
        {
          title: "远程重启",
          key: "action",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "设备反控",
          dataIndex: "control",
          key: "control"
        },
        {
          title: "获取时间",
          dataIndex: "gmtModified",
          key: "gmtModified"
        }
      ],
      tableData: []
    };
  },
  methods: {
    getTableData() {
      let params = {
        page: this.current,
        size: this.pagesize
      };
      this.loading = true;
      this.$api.iMaintain
        .maintainControl(params)
        .then(res => {
          if (res.data.state == 0) {
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.tableData = [];
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
