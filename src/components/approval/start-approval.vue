<template>
  <a-card :bordered="false" class="index">
    <a-table
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action">
        <a @click="check()">查看</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :total="500"
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
      columns: [
        {
          title: "序号",
          key: "key",
          dataIndex: "key",
          align: "center"
        },
        {
          title: "标题",
          key: "name",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          dataIndex: "status",
          align: "center"
        },
        {
          title: "申请者",
          key: "people",
          dataIndex: "people",
          align: "center"
        },
        {
          title: "提交时间",
          key: "time",
          dataIndex: "time",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          dataIndex: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.mockData();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    check() {
      this.modalInfo = {
        show: true
      };
    },
    mockData() {
      this.$api.approval.getWaitList().then(res => {
        this.data = res.data.dataSours;
      });
    }
  }
};
</script>
