<template>
  <a-card :bordered="false" class="instrument" title="仪器型号设置">
    <a-button type="primary" @click="visible = true">添加仪器</a-button>

    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="visible = true">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteInstrument(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />

    <instrument-edit :visible.sync="visible"> </instrument-edit>
  </a-card>
</template>

<script>
import instrumentEdit from "@/components/platform/instrument/instrument-edit";
export default {
  components: { instrumentEdit },
  data() {
    return {
      current: 1,
      total: 1,
      visible: false,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "仪器型号",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "分类编码",
          key: "sortnum",
          dataIndex: "sortnum"
        },
        {
          title: "关联因子",
          key: "relativeUnit",
          dataIndex: "relativeUnit"
        },
        {
          title: "生产厂家",
          key: "factory",
          dataIndex: "factory"
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
          name: "仪器型号",
          sortnum: "12345678",
          relativeUnit: "",
          factory: ""
        }
      ]
    };
  },
  methods: {
    deleteInstrument(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: "是否删除",
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
