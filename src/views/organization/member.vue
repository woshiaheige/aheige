<template>
  <div class="organization">
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="用户姓名">
          <a-input placeholder="请输入" v-model="formInline.name"></a-input>
        </a-form-item>
        <a-form-item label="用户账号">
          <a-input placeholder="请输入" v-model="formInline.username"></a-input>
        </a-form-item>
        <a-form-item style="float:right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-item>
        <a-form-item style="float:right">
          <a-button type="primary" @click="reset">
            重置
          </a-button>
        </a-form-item>
        <a-form-item label="手机号码">
          <a-input placeholder="请输入" v-model="formInline.phone"></a-input>
        </a-form-item>
        <a-form-item label="用户状态">
          <a-select
            defaultValue="all"
            v-model="formInline.isLocked"
            style="width:100px"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">锁定</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card v-margin:top="16">
      <div class="card-header">
        <div class="title">用户列表</div>
        <div class="extra">
          <a-button type="primary" @click="visible = true">
            <a-icon type="plus" />新建
          </a-button>
        </div>
      </div>

      <a-table
        size="middle"
        rowKey="id"
        :columns="columns"
        :loading="loading"
        :dataSource="tableData"
        :pagination="false"
        v-margin:top="16"
      >
        <template slot="status" slot-scope="text, row">
          <a-tag color="green" v-if="row.isLocked != 1">正常</a-tag>
          <a-tag color="red" v-else>锁定</a-tag>
        </template>
        <span slot="action" slot-scope="row">
          <a @click="onEdit(row)">编辑</a>
          <span v-if="row.id != 1">
            <a-divider type="vertical" />
            <a @click="onDelete(row)">删除</a>
            <a-divider type="vertical" />
            <a @click="onLock(row)" v-show="row.isLocked == 1">解锁</a>
            <a @click="unLock(row)" v-show="row.isLocked == 0">锁定</a>
          </span>
        </span>
      </a-table>
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
      <add-edit
        :visible.sync="visible"
        :memberDetail="memberDetail"
        @updateTable="getTableData"
      ></add-edit>
      <!-- <detail :obj="checkObj" @cancel="cancel"></detail> -->
    </a-card>
  </div>
</template>
<script>
import addEdit from "@/components/organization/member/add-edit";
// import detail from "@/components/organization/member/detail";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      total: 0,
      size: 10,
      loading: false,
      formInline: {
        name: "",
        username: "",
        phone: "",
        isLocked: "all"
      },
      columns: [
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "账号",
          dataIndex: "username"
        },
        {
          title: "手机号码",
          dataIndex: "phone"
        },
        {
          title: "用户权限",
          dataIndex: "roleName"
        },
        {
          title: "用户状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 300
        }
      ],
      tableData: [],
      visible: false,
      memberDetail: ""
    };
  },
  methods: {
    getTableData() {
      let params = {
        size: this.size,
        page: this.current,
        name: this.formInline.name,
        phone: this.formInline.phone,
        isLocked:
          this.formInline.isLocked == "all" ? "" : this.formInline.isLocked,
        username: this.formInline.username
      };
      this.loading = true;
      this.$api.organization
        .sysUser(params)
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
      this.$api.organization.getSysUserById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.memberDetail = res.data.data;
          this.visible = true;
        }
      });
    },

    onDelete(row) {
      console.log(row);
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除用户${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.organization.deleteUser({ id: row.id }).then(res => {
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
    onLock(row) {
      console.log(row);
      let _this = this;
      this.$confirm({
        title: "锁定",
        content: `是否锁定用户${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.organization.lockedUser({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("锁定成功");
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
    unLock(row) {
      console.log(row);
      let _this = this;
      this.$confirm({
        title: "激活",
        content: `是否激活用户${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.organization.unlockedUser({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("激活成功");
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
    cancel(value) {
      this.obj.show = value;
      this.checkObj.show = value;
    },
    reset() {
      this.formInline = this.$options.data().formInline;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
