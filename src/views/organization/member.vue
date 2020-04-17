<template>
  <div class="organization">
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="姓名" v-model="formInline.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="手机号" v-model="formInline.phone"></a-input>
        </a-form-item>
        <a-form-item style="float:right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card v-margin:top="16">
      <div class="card-header">
        <div class="title">用户管理</div>
        <div class="extra">
          <a-button type="success" @click="visible = true">
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
        <span slot="action" slot-scope="row">
          <a @click="onEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
          <a-divider type="vertical" />
          <a @click="onLock(row)" v-show="row.isLocked == 1">锁定</a>
          <a @click="unLock(row)" v-show="row.isLocked == 0">激活</a>
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
      pagesize: 10,
      loading: false,
      formInline: {
        name: "",
        phone: ""
      },
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          },
          width: 100
        },
        {
          title: "姓名",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "账号",
          dataIndex: "username",
          align: "center"
        },
        {
          title: "手机号码",
          dataIndex: "phone",
          align: "center"
        },
        {
          title: "用户权限",
          dataIndex: "roleName",
          align: "center"
        },
        {
          title: "用户状态",
          dataIndex: "status",
          customRender: (text, row) => {
            return row.isLocked == 0 ? "冻结" : "激活";
          },
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
        pagesize: this.pagesize,
        page: this.current,
        name: this.formInline.name,
        phone: this.formInline.phone
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
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
