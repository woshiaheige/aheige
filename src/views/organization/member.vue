<template>
  <a-card :bordered="false" class="organization">
    <span slot="title">用户管理</span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="姓名" v-model="formInline.name"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="手机号" v-model="formInline.phone"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="success" @click="obj.show = true">
          新增
        </a-button>
      </a-form-item>
    </a-form>
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
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
    <!-- <detail :obj="checkObj" @cancel="cancel"></detail> -->
  </a-card>
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
          }
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
          align: "center"
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
      console.log(row);
      this.obj.show = true;
      this.obj.row = row;
    },
    onDelete(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: `是否删除用户${row.name}`,
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
