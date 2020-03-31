<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title">违章管理</span>
    <a-form layout="inline">
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="show = true">
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      v-margin:top="16"
    >
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
import addEdit from "@/components/maintain/violation/add-edit";
export default {
  components: { addEdit },
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
          title: "车辆",
          dataIndex: "carName"
        },
        {
          title: "违章时间",
          dataIndex: "time"
        },
        {
          title: "违章地点",
          dataIndex: "address"
        },
        {
          title: "违章行为",
          dataIndex: "behavior"
        },
        {
          title: "违章扣分",
          dataIndex: "num"
        },
        {
          title: "填写时间",
          dataIndex: "signTime"
        }
      ],
      tableData: [],
      show: false
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getViolationList().then(res => {
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
