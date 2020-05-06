<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="姓名">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="手机号">
          <a-input
            placeholder="请输入"
            v-model="list.phone"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="organization" v-margin:top="16">
      <div class="card-header">
        <div class="title">用户列表</div>
        <div class="extra">
          <a-button type="primary" @click="onEdit('add')">
            <a-icon type="plus" />新建
          </a-button>
        </div>
      </div>
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        v-margin:top="16"
        :loading="loading"
      >
        <template slot="isBinding" slot-scope="isBinding">
          <a-badge color="green" text="是" v-if="isBinding == 1" />
          <a-badge color="red" text="否" v-if="isBinding == 0" />
        </template>
        <span slot="action" slot-scope="row">
          <a @click="onEdit('edit', row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :current="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
      <add-edit v-model="obj" @refresh="getTableData"></add-edit>
    </a-card>
  </div>
</template>
<script>
import addEdit from "@/components/customer/enterprise/add-edit-user";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      loading: false,
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName"
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "账号",
          dataIndex: "username"
        },
        {
          title: "手机",
          dataIndex: "phone"
        },
        {
          title: "是否绑定微信",
          dataIndex: "isBinding",
          scopedSlots: { customRender: "isBinding" },
          align: "center",
          width: 150
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 150
        }
      ],
      tableData: [],
      obj: {
        show: false
      },
      list: {}
    };
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseId: this.$route.query.id,
        name: this.list.name,
        phone: this.list.phone
      };
      this.loading = true;
      this.$api.customer
        .getEnterpriseList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = Number(res.data.data.total);
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    onEdit(type, row) {
      this.obj.show = true;
      this.obj.type = type;
      this.obj.row = row;
    },
    onDelete(row) {
      let that = this;
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          that.$api.customer
            .delEnterprise({
              id: row.id
            })
            .then(res => {
              if (res.data.state == 0) {
                that.$message.success("删除成功");
                that.getTableData();
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    reset() {
      this.list = { name: "", phone: "" };
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
