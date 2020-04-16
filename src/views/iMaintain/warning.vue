<template>
  <a-card :bordered="false" class="warning" title="报警管理">
    <a-row>
      <a-col>
        <a-button type="primary" @click="handleWarn">处理</a-button>
        <a-button v-margin="'0 20'" @click="ignoreWarn">忽略</a-button>
      </a-col>
    </a-row>
    <a-table
      size="middle"
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      :rowSelection="rowSelection"
    >
      <span slot="state" slot-scope="state">
        <a-tag color="#f50" v-show="state == 1">未处理</a-tag>
        <a-tag color="#2db7f5" v-show="state == 2">处理中</a-tag>
        <a-tag color="#87d068" v-show="state == 3">已关闭</a-tag>
        <a-tag color="#108ee9" v-show="state == 4">忽略</a-tag>
      </span>
      <span slot="action" slot-scope="action">
        <a @click="viewWarn(action)">查看</a>
      </span>
    </a-table>

    <a-pagination
      size="small"
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />

    <warning-detail :visible.sync="visible"> </warning-detail>
  </a-card>
</template>

<script>
import warningDetail from "@/components/i-maintain/warning/warning-detail";
export default {
  components: { warningDetail },
  data() {
    const rowSelection = {
      onChange: (_, selectedRows) => {
        this.selectedRows = selectedRows.map(item => {
          return item.id;
        });
      }
    };
    return {
      current: 1,
      total: 1,
      pagesize: 10,
      visible: false,
      selectedRows: "", //选中的行
      rowSelection,
      loading: true,
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
          title: "警报信息",
          dataIndex: "message",
          key: "message"
        },
        {
          title: "所属仪器",
          dataIndex: "instrumentName",
          key: "instrumentName"
        },
        {
          title: "所属站点",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "状态",
          dataIndex: "state",
          key: "state",
          scopedSlots: { customRender: "state" }
        },
        {
          title: "报警时间",
          dataIndex: "gmtModified",
          key: "gmtModified"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: []
    };
  },
  methods: {
    handleWarn() {
      if (this.selectedRows.length == 0) {
        this.$message.info("先选择数据");
        return;
      }
      this.$confirm({
        title: "处理",
        content: `处理这${this.selectedRows.length}条警告吗？`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    ignoreWarn() {
      if (this.selectedRows.length == 0) {
        this.$message.info("先选择数据");
        return;
      }
      this.$confirm({
        title: "忽略",
        content: `忽略这${this.selectedRows.length}条警告吗？`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    viewWarn() {
      this.visible = true;
    },
    getTableData() {
      let params = {
        page: this.current,
        size: this.pagesize
      };
      this.loading = true;
      this.$api.iMaintain
        .maintainAlert(params)
        .then(res => {
          console.log(res);
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
