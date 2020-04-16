<template>
  <a-card :bordered="false" class="platform">
    <span slot="title">行业设置</span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="行业名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="success" @click="visible = true">
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      rowKey="id"
      :columns="columns"
      :loading="loading"
      :dataSource="tableData"
      :pagination="false"
      v-margin:top="16"
    >
      <span slot="action" slot-scope="row">
        <a @click="onEdit(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
      </span>
    </a-table>
    <a-pagination
      v-margin:top="16"
      showSizeChanger
      :total="total"
      :current="current"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
    <industry-edit
      :visible.sync="visible"
      :industryDetail="industryDetail"
    ></industry-edit>
  </a-card>
</template>
<script>
import industryEdit from "@/components/platform/industry/industry-edit";
export default {
  components: { industryEdit },
  data() {
    return {
      current: 1,
      total: 0,
      pagesize: 10,
      loading: false,
      industryDetail: "",
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          },
          align: "center"
        },
        {
          title: "行业名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [
        { name: "互联网", id: 1 },
        { name: "金融", id: 2 }
      ],
      visible: false
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getMemberList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onEdit(row) {
      console.log(row);
      this.industryDetail = row;
      this.visible = true;
    },
    onDelete(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: `是否删除行业 ${row.name}`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onLock(row) {
      console.log(row);
      this.$confirm({
        title: "锁定",
        content: `是否锁定用户${row.name}`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  },
  mounted() {
    // this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
