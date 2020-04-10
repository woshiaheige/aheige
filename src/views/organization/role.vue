<template>
  <a-card :bordered="false" class="organization role">
    <span slot="title">角色管理 </span>
    <a-row :gutter="16">
      <!--left tree-->
      <a-col class="department-left" :span="8">
        <role-tree></role-tree>
      </a-col>
      <!--right content-->
      <a-col class="department-right" :span="16">
        <a-card>
          <!-- <div class="department-right-title">
            <b>默认角色组</b>
            <a-button v-margin:left="16">编辑角色组</a-button>
            <a-button v-margin:left="16">编辑权限</a-button>
            <p class="roleTips">默认角色组及角色为系统内部使用，无法编辑</p>
          </div> -->
          <a-button type="primary" @click="onEdit()">添加角色</a-button>
          <div class="department-right-table">
            <a-table
              :columns="columns"
              :dataSource="tableData"
              :pagination="false"
              v-margin:top="16"
              :rowSelection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
              }"
            >
            </a-table>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>
<script>
import addEdit from "@/components/organization/role/add-edit";
import roleTree from "@/components/organization/role-tree";
export default {
  components: { roleTree, addEdit },
  data() {
    return {
      selectedRowKeys: [],
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "手机",
          dataIndex: "tel",
          align: "center"
        },
        {
          title: "邮箱",
          dataIndex: "email",
          align: "center"
        },
        {
          title: "职位",
          dataIndex: "position",
          align: "center"
        }
      ],
      tableData: [],
      obj: {
        show: false
      }
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$api.maintain.getDepartmentList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onEdit(row) {
      console.log(row);
      this.obj.show = true;
      this.obj.row = row;
    },
    cancel(value) {
      this.obj.show = value;
    }
  }
};
</script>
<style lang="less" scoped></style>
