<template>
  <a-card :bordered="false" class="organization">
    <span slot="title">
      企业用户
    </span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="姓名"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="手机号"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查询
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="success" html-type="submit" @click="onEdit()">
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      size="middle"
      :columns="columns"
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
      size="small"
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>
<script>
import addEdit from "@/components/customer/enterprise/add-edit-user";
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
          title: "企业名称",
          dataIndex: "department"
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "账号",
          dataIndex: "tel"
        },
        {
          title: "手机",
          dataIndex: "tel"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [
        {
          department: "化一环境有限公司",
          name: "张三",
          tel: "13888888888"
        }
      ],
      obj: {
        show: false
      },
      checkObj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      // this.$api.maintain.getMemberList().then(res => {
      //   this.tableData = res.data.data;
      //   this.total = res.data.total;
      // });
    },
    onEdit(row) {
      console.log(row);
      this.obj.show = true;
      this.obj.row = row;
    },
    onDelete(row) {
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
    cancel(value) {
      this.obj.show = value;
      this.checkObj.show = value;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
