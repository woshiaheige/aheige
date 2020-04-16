<template>
  <a-card :bordered="false" class="platform">
    <span slot="title">数据字典</span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="字典名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="字典编号"></a-input>
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
    <dictionary-edit :visible.sync="visible"></dictionary-edit>
  </a-card>
</template>
<script>
import dictionaryEdit from "@/components/platform/dictionary/dictionary-edit";
export default {
  components: { dictionaryEdit },
  data() {
    return {
      current: 1,
      total: 0,
      pagesize: 10,
      loading: false,
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
          title: "字典名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "字典编码",
          dataIndex: "code",
          align: "center"
        },
        {
          title: "字典值",
          dataIndex: "val",
          align: "center"
        },
        {
          title: "字典说明",
          dataIndex: "desc",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [],
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
