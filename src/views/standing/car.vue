<template>
  <a-card :bordered="false" class="standing" title="车辆管理">
    <a-button type="primary" slot="extra" @click="edit('', 'add')"
      >新增</a-button
    >
    <a-table
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="edit(row, 'edit')">编辑</a>
        <a-divider type="vertical" />
        <a @click="delect(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
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
import modal from "@/components/standing/car-modal";
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
          title: "车辆",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "品牌型号",
          dataIndex: "brand",
          align: "center"
        },
        {
          title: "可用状态",
          dataIndex: "status",
          align: "center"
        },
        {
          title: "默认使用小组",
          dataIndex: "group",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$api.standing.getCarList().then(res => {
        this.data = res.data.data;
        this.total = res.data.total;
      });
    },
    edit(row, type) {
      this.modalInfo = {
        show: true,
        info: row,
        type: type
      };
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
