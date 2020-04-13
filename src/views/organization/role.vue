<template>
  <a-card :bordered="false" class="organization role">
    <span slot="title">角色管理 </span>
    <a-row :gutter="16">
      <!--left tree-->
      <!-- <a-col class="department-left" :span="8">
        <role-tree></role-tree>
      </a-col> -->
      <!--right content-->
      <!-- <a-col class="department-right" :span="16">
        <a-card> -->
      <!-- <div class="department-right-title">
            <b>默认角色组</b>
            <a-button v-margin:left="16">编辑角色组</a-button>
            <a-button v-margin:left="16">编辑权限</a-button>
            <p class="roleTips">默认角色组及角色为系统内部使用，无法编辑</p>
          </div> -->
      <a-button type="primary" @click="onEdit()">添加角色</a-button>
      <!-- <div class="department-right-table"> -->
      <a-table
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        v-margin:top="16"
      >
        <span slot="action" slot-scope="row">
          <a>授权</a>
          <a-divider type="vertical" />
          <!-- <a>数据权限</a>
          <a-divider type="vertical" /> -->
          <a @click="onEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
      </a-table>
      <a-pagination
        v-margin:top="16"
        showQuickJumper
        showSizeChanger
        :defaultCurrent="current"
        :defaultPageSize="pageSize"
        :total="total"
      />
      <!-- </div> -->
      <!-- </a-card>
      </a-col> -->
    </a-row>
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>
<script>
import addEdit from "@/components/organization/role/add-edit";
// import roleTree from "@/components/organization/role-tree";
export default {
  components: { addEdit },
  data() {
    return {
      // selectedRowKeys: [],
      current: 1,
      pageSize: 10,
      total: 3,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "角色名称",
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
        {
          name: "超级管理员"
        },
        {
          name: "管理员"
        },
        {
          name: "运维人员"
        }
      ],
      obj: {
        show: false
      }
    };
  },
  computed: {
    // hasSelected() {
    //   return this.selectedRowKeys.length > 0;
    // }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      // this.$api.maintain.getDepartmentList().then(res => {
      //   this.tableData = res.data.data;
      //   this.total = res.data.total;
      // });
    },
    // onSelectChange(selectedRowKeys) {
    //   console.log("selectedRowKeys changed: ", selectedRowKeys);
    //   this.selectedRowKeys = selectedRowKeys;
    // },
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
    }
  }
};
</script>
<style lang="less" scoped></style>
