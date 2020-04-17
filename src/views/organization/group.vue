<template>
  <div class="organization">
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="小组名称" v-model="formInline.name"></a-input>
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
        <div class="title">小组管理</div>
        <div class="extra">
          <a-button type="success" @click="visible = true">
            <a-icon type="plus" />新建
          </a-button>
        </div>
      </div>
      <a-list
        :grid="{ gutter: 16, column: 4 }"
        :dataSource="tableData"
        :loading="loading"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card hoverable>
            <span slot="title">{{ item.name }}</span>
            <template class="ant-card-actions" slot="actions">
              <a @click="onEdit(item)">编辑</a>
              <!-- <a @click="onGroupShow(item)">小组成员</a> -->
              <a @click="onDelete(item)">删除小组</a>
            </template>
            <a-tag
              v-for="(member, key) of item.users"
              :key="key"
              color="#2db7f5"
            >
              {{ member.name }}
            </a-tag>
          </a-card>
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

    <!-- 新增编辑小组 -->
    <group-edit
      :visible.sync="visible"
      :groupDetail="groupDetail"
      @updateTable="getTableData"
    />
    <!-- 新增编辑组员
    <group-member :visible.sync="groupVisible" /> -->
  </div>
</template>
<script>
import groupEdit from "@/components/organization/group/group-edit";
// import groupMember from "@/components/organization/group/group-member";
export default {
  components: { groupEdit },
  data() {
    return {
      visible: false,
      groupDetail: "",
      formInline: {
        name: ""
      },
      current: 1,
      total: 0,
      loading: false,
      pagesize: 10,
      tableData: []
    };
  },
  methods: {
    getTableData() {
      let params = {
        size: this.pagesize,
        page: this.current,
        name: this.formInline.name
      };
      this.loading = true;
      this.$api.organization
        .sysGroup(params)
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
      this.$api.organization.getSysGroupById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.groupDetail = res.data.data;
          this.visible = true;
        }
      });
    },
    onDelete(row) {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除小组 ${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.organization.deleteSysGroup({ id: row.id }).then(res => {
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
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
