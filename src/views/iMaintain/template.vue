<template>
  <a-card :bordered="false" class="template" title="报告模板">
    <a-button type="primary" @click="visible = true">新增报告模板</a-button>

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
        <a @click="showTemplateEdit(row)">编辑</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <template-edit :visible.sync="visible" />
  </a-card>
</template>

<script>
import templateEdit from "@/components/i-maintain/template/template-edit";
export default {
  components: { templateEdit },
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
          title: "模板名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "适用对象",
          dataIndex: "object",
          key: "object"
        },
        {
          title: "上传人",
          dataIndex: "createdBy",
          key: "createdBy"
        },
        {
          title: "上传时间",
          dataIndex: "createdAt",
          key: "createdAt"
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
          name: "日常巡检",
          object: "对象A",
          createdBy: "鲁迅",
          createdAt: "2019-10-15 15:12:11"
        }
      ]
    };
  },
  methods: {
    deleteContract(row) {
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
    },
    showTemplateEdit() {
      this.visible = true;
    }
  }
};
</script>
