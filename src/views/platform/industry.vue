<template>
  <div class="platform">
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">行业列表</div>
        <div class="extra">
          <a-form layout="inline">
            <a-form-item>
              <a-button type="primary" @click="visible = true">
                <a-icon type="plus" />新建
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-input-search
                placeholder="请输入行业名称"
                style="width: 200px"
                v-model="formInline.name"
                @search="onSubmit"
              />
            </a-form-item>
          </a-form>
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
      <industry-edit
        :visible.sync="visible"
        :industryDetail="industryDetail"
        @updateTable="getTableData"
      ></industry-edit>
    </a-card>
  </div>
</template>
<script>
import industryEdit from "@/components/platform/industry/industry-edit";
export default {
  components: { industryEdit },
  data() {
    return {
      current: 1,
      total: 0,
      size: 10,
      loading: false,
      industryDetail: "",
      formInline: {
        name: ""
      },
      columns: [
        {
          title: "行业名称",
          dataIndex: "name"
        },
        {
          width: 200,
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [],
      visible: false
    };
  },
  methods: {
    getTableData() {
      let params = {
        size: this.size,
        page: this.current,
        name: this.formInline.name
      };
      this.loading = true;
      this.$api.platform
        .sysIndustry(params)
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
      this.$api.platform.getCusEnterpriseById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.industryDetail = res.data.data;
          this.visible = true;
        }
      });
    },
    onDelete(row) {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除行业 ${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.platform.deleteCusEnterprise({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("删除成功");
              if (_this.tableData.length == 1) {
                if (_this.current > 1) _this.current--;
              }
              _this.getTableData();
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
      this.$confirm({
        title: "冻结",
        content: `是否冻结用户${row.name}`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
