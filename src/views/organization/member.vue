<template>
  <a-card :bordered="false" class="organization">
    <span slot="title">成员管理</span>
    <a-form layout="inline">
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="onEdit()">
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
      <span slot="action" slot-scope="row">
        <a @click="onCheck(row)">查看</a>
      </span>
    </a-table>
    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
    <detail :obj="checkObj" @cancel="cancel"></detail>
  </a-card>
</template>
<script>
import addEdit from "@/components/organization/member/add-edit";
import detail from "@/components/organization/member/detail";
export default {
  components: { addEdit, detail },
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
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "手机",
          dataIndex: "tel"
        },
        {
          title: "所属部门",
          dataIndex: "department"
        },
        {
          title: "职位",
          dataIndex: "position"
        },
        {
          title: "角色",
          dataIndex: "role"
        },
        {
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
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
      this.$api.maintain.getMemberList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onEdit(row) {
      console.log(row);
      this.obj.show = true;
      this.obj.row = row;
    },
    onCheck(row) {
      this.checkObj.show = true;
      this.checkObj.row = row;
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
