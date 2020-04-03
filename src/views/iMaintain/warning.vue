<template>
  <a-card :bordered="false" class="warning" title="报警管理">
    <a-row>
      <a-col>
        <a-button type="primary" @click="handleWarn">处理</a-button>
        <a-button v-margin="'0 20'" @click="ignoreWarn">忽略</a-button>
      </a-col>
    </a-row>
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      :rowSelection="rowSelection"
    >
      <span slot="action" slot-scope="row">
        <a @click="viewWarn(row)">查看</a>
      </span>
    </a-table>

    <a-pagination
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
      visible: false,
      selectedRows: "", //选中的行
      rowSelection,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "警报信息",
          dataIndex: "msg",
          key: "msg"
        },
        {
          title: "所属仪器",
          dataIndex: "instrument",
          key: "instrument"
        },
        {
          title: "所属站点",
          dataIndex: "station",
          key: "station"
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "报警时间",
          dataIndex: "warnTime",
          key: "warnTime"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          msg: "值不变",
          station: "可口可乐（污水）",
          status: "处理中",
          instrument: "仪器A",
          warnTime: "2019-10-15 10:20"
        },
        {
          order: "2",
          id: "1",
          msg: "值不准",
          station: "丰华玻璃",
          status: "处理中",
          instrument: "仪器B",
          warnTime: "2019-10-15 10:20"
        }
      ]
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
      this.$api.iMaintain.getWarningList().then(res => {
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
