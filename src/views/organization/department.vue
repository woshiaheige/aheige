<template>
  <a-card :bordered="false" class="organization">
    <span slot="title">部门管理 </span>
    <a-row :gutter="16">
      <!--left tree-->
      <a-col class="department-left" :span="8">
        <department-tree></department-tree>
      </a-col>
      <!--right content-->
      <a-col class="department-right" :span="16">
        <a-card>
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>化一环境有限公司</a-breadcrumb-item>
            <a-breadcrumb-item href="">平台技术部</a-breadcrumb-item>
          </a-breadcrumb>
          <div class="department-right-title">
            <b>化一环境有限公司</b>
            <a-button v-margin:left="16">编辑部门</a-button>
            <a-button v-margin:left="16">添加子部门</a-button>
          </div>
          <a-card class="department-right-child">
            <p><a-icon type="right" v-margin:right="5" />子部门数量：5</p>
          </a-card>
          <div class="department-right-table">
            <p class="title">
              <a-icon type="team" v-margin:right="5" />部门人员
            </p>
            <a-button type="primary">新增员工</a-button>
            <a-button :disabled="!hasSelected">编辑员工</a-button>
            <a-button :disabled="!hasSelected">编辑角色</a-button>
            <a-button :disabled="!hasSelected">调整部门</a-button>
            <a-button :disabled="!hasSelected" type="danger">批量删除</a-button>
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
  </a-card>
</template>
<script>
import departmentTree from "@/components/common/department-tree";
export default {
  components: { departmentTree },
  data() {
    return {
      selectedRowKeys: [],
      columns: [
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "手机",
          dataIndex: "tel"
        },
        {
          title: "邮箱",
          dataIndex: "email"
        },
        {
          title: "职位",
          dataIndex: "position"
        }
      ],
      tableData: []
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
    }
  }
};
</script>
<style lang="less" scoped></style>
