<template>
  <div class="organization role">
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="权限名称" v-model="formInline.name"></a-input>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">权限管理</div>
        <div class="extra">
          <a-button type="success" @click="onEdit(false)">
            <a-icon type="plus" />新增
          </a-button>
        </div>
      </div>
      <a-list
        itemLayout="horizontal"
        :dataSource="tableData"
        :loading="loading"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="onRole(item)">编辑</a>
          <a
            slot="actions"
            @click="onDelete(item)"
            v-if="item.id != 1 && item.id != 2 && item.id != 3 && item.id != 4"
            >删除</a
          >
          <a-list-item-meta>
            <a-tag
              slot="description"
              v-for="(role, key) of item.resourceIds"
              :key="key"
              v-margin="20"
              >{{ role.name }}</a-tag
            >
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :current="current"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </a-card>

    <!-- <add-edit :obj="obj" @cancel="cancel" @confirm="confirm"></add-edit> -->
    <role-tree
      @updateTable="getTableData"
      :visible.sync="visible"
      :roleDetail="roleDetail"
    />
  </div>
</template>
<script>
// import addEdit from "@/components/organization/role/add-edit";
import roleTree from "@/components/organization/role-tree";
export default {
  components: { roleTree },
  data() {
    return {
      loading: false,
      visible: false,
      current: 1,
      pageSize: 10,
      total: 3,
      formInline: { name: "" },
      tableData: [],
      obj: {
        show: false,
        detail: ""
      },
      roleDetail: ""
    };
  },

  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let params = {
        pagesize: this.pagesize,
        page: this.current,
        name: this.formInline.name
      };
      this.loading = true;
      this.$api.organization
        .sysRole(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onEdit(row) {
      if (row == false) {
        this.visible = true;
        this.roleDetail = "";
        return;
      }
      this.$api.organization.getSysRoleById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.obj = {
            show: true,
            detail: res.data.data
          };
        }
      });
    },
    onDelete(row) {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除权限 ${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.organization.deleteSysRole({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("删除成功");
              _this.getTableData();
            } else {
              _this.$message.error(res.data.msg);
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onRole(row) {
      //授权
      this.roleDetail = "";
      this.roleDetail = row;
      this.visible = true;
    },
    cancel(value) {
      this.obj.show = value;
    },
    confirm() {
      this.obj.show = false;
      this.getTableData();
    }
  }
};
</script>
<style lang="less" scoped></style>
