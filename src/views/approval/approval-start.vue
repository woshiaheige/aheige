<template>
  <a-card :bordered="false" class="index">
    <span slot="title">
      我的审批
    </span>
    <a-table
      size="middle"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="check(row)">查看</a>
        <a-divider type="vertical" />
        <a @click="delect(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      size="small"
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :total="total"
      :current="current"
    />
    <modal v-model="modalInfo"> </modal>
  </a-card>
</template>

<script>
import modal from "@/components/approval/start-modal";
export default {
  components: { modal },
  data() {
    return {
      modalInfo: { show: false },
      current: 1,
      total: 0,
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "标题",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "状态",
          dataIndex: "status",
          align: "center"
        },
        {
          title: "申请者",
          dataIndex: "people",
          align: "center"
        },
        {
          title: "提交时间",
          dataIndex: "time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    check(row) {
      this.modalInfo = {
        show: true,
        info: row
      };
    },
    getTableData() {
      this.$api.approval.getWaitList().then(res => {
        this.data = res.data.data;
        this.total = res.data.total;
      });
    },
    delect(row) {
      console.log(row);
      this.$confirm({
        title: "确定删除" + row.name + "吗?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
