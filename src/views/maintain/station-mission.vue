<template>
  <a-card :bordered="false" class="index">
    <span slot="title"><a-icon type="arrow-left" />站点任务管理</span>
    <a-form layout="inline">
      <a-form-item>
        <a-select placeholder="企业客户" v-width="150">
          <!-- <a-select-option value="1"></a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select placeholder="运维小组" v-width="150"> </a-select>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="站点名称、编号"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      v-margin:top="16"
    >
      <span slot="action">
        <a @click="show = true">编辑</a>
      </span>
    </a-table>
    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <!-- <add-edit :visible="show" @cancel="cancel"></add-edit> -->
  </a-card>
</template>
<script>
// import addEdit from "@/components/maintain/station/add-edit";
export default {
  components: {},
  data() {
    return {
      current: 1,
      total: 0,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "站点名称（编号）",
          dataIndex: "title"
        },
        {
          title: "企业名称",
          dataIndex: "company"
        },
        {
          title: "维护方案",
          dataIndex: "plan"
        },
        {
          title: "运维小组",
          dataIndex: "team"
        },
        {
          title: "任务数量",
          dataIndex: "num"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
      show: false
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getMissionList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    cancel(value) {
      this.show = value;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
