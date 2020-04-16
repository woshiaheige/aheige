<template>
  <a-card :bordered="false" class="organization role">
    <span slot="title">权限管理 </span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="小组名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="success" @click="onEdit()">添加权限</a-button>
      </a-form-item>
    </a-form>
    <a-row :gutter="16">
      <a-row
        type="flex"
        justify="space-between"
        align="middle"
        v-margin:top="20"
        :gutter="[16, 16]"
      >
        <a-col v-for="(item, index) of tableData" :key="index">
          <a-card hoverable style="width: 300px">
            <span slot="title">{{ item.name }}</span>
            <template class="ant-card-actions" slot="actions">
              <a-icon type="setting" key="setting" @click="onEdit(item)" />
              <a-icon type="edit" key="edit" @click="onRole(item)" />
              <a-icon type="delete" key="delete" @click="onDelete(item)" />
            </template>
          </a-card>
        </a-col>
      </a-row>
      <a-pagination
        size="small"
        v-margin:top="16"
        showQuickJumper
        showSizeChanger
        :defaultCurrent="current"
        :defaultPageSize="pageSize"
        :total="total"
      />
    </a-row>
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
    <role-tree :visible.sync="visible" />
  </a-card>
</template>
<script>
import addEdit from "@/components/organization/role/add-edit";
import roleTree from "@/components/organization/role-tree";
export default {
  components: { addEdit, roleTree },
  data() {
    return {
      // selectedRowKeys: [],
      visible: false,
      current: 1,
      pageSize: 10,
      total: 3,
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
    onRole(row) {
      //授权
      console.log(row);
      this.visible = true;
    },
    cancel(value) {
      this.obj.show = value;
    }
  }
};
</script>
<style lang="less" scoped></style>
