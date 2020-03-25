<template>
  <a-card :bordered="false" class="index">
    <span slot="title"><a-icon type="arrow-left" />任务一览</span>
    <a-form layout="inline">
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="show = true">
          突发任务
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :dataSource="tableData" v-margin:top="16">
      <span slot="action">
        <a>申请延期</a>
        <a-divider type="vertical" />
        <a>任务关闭</a>
      </span>
      <a slot="check">报告</a>
    </a-table>
    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :visible="show" @cancel="cancel"></add-edit>
  </a-card>
</template>
<script>
import addEdit from "@/components/maintain/mission/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      total: 10,
      columns: [
        {
          title: "序号",
          dataIndex: ""
        },
        {
          title: "任务名称（编号）",
          dataIndex: ""
        },
        {
          title: "站点",
          dataIndex: ""
        },
        {
          title: "企业名称",
          dataIndex: ""
        },
        {
          title: "任务状态",
          dataIndex: ""
        },
        {
          title: "运维小组",
          dataIndex: ""
        },
        {
          title: "任务时间",
          dataIndex: ""
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "查看",
          key: "check",
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: [],
      show: false
    };
  },
  methods: {
    getTableData() {},
    cancel(value) {
      this.show = value;
    }
  },
  mounted() {
    // this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
