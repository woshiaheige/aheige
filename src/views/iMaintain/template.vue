<template>
  <a-card :bordered="false" class="template" title="报告模板">
    <a-button type="primary" @click="visible = true">新增报告模板</a-button>

    <a-table
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="type" slot-scope="type">
        <span>{{ type == "1" ? "任务报告" : "工作流程" }}</span>
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
      pagesize: 10,
      loading: false,
      visible: false,
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
          title: "模板名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "适用对象",
          dataIndex: "type",
          key: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "上传人",
          dataIndex: "userName",
          key: "userName"
        },
        {
          title: "上传时间",
          dataIndex: "gmtModified",
          key: "gmtModified"
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
          type: "对象A",
          userName: "马小跳",
          gmtModified: "2019-10-15 15:12:11"
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
    },
    getTableData() {
      let params = {
        page: this.current,
        size: this.pagesize
      };
      this.loading = true;
      this.$api.iMaintain
        .maintainTemplate(params)
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
