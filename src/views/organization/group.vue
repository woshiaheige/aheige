<template>
  <div class="organization">
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">小组列表</div>
        <div class="extra">
          <a-form layout="inline">
            <a-form-item>
              <a-button type="primary" @click="visible = true">
                <a-icon type="plus" />新建
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-input-search
                placeholder="请输入小组名称"
                style="width: 200px"
                v-model="formInline.name"
                @search="onSubmit"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <a-list
        :grid="{ gutter: 16, column: 4 }"
        :dataSource="tableData"
        :loading="loading"
        class="card-list"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.name">
            <template class="ant-card-actions" slot="actions">
              <div key="edit" @click="onEdit(item)">编辑</div>
              <div key="delete" @click="onDelete(item)" v-color="'#ed4014'">
                删除
              </div>
            </template>

            <a-tooltip v-for="(member, key) of item.users" :key="key">
              <template slot="title">
                {{ member.name }}
              </template>
              <a-tag class="tag-ellipsis" color="blue" style="margin:5px">
                {{ member.name }}
              </a-tag>
            </a-tooltip>

            <a-empty v-if="item.users.length == 0" :image="simpleImage" />
          </a-card>
        </a-list-item>
      </a-list>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSizeOptions="pageSizeOptions"
        :defaultPageSize="8"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :current="current"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </a-card>

    <!-- 新建编辑小组 -->
    <group-edit
      :visible.sync="visible"
      :groupDetail="groupDetail"
      @updateTable="getTableData"
    />
  </div>
</template>
<script>
import groupEdit from "@/components/organization/group/group-edit";
import { Empty } from "ant-design-vue";
export default {
  components: { groupEdit },
  data() {
    return {
      visible: false,
      groupDetail: "",
      formInline: {
        name: ""
      },
      pageSizeOptions: ["8", "16", "24", "32"],
      current: 1,
      total: 0,
      loading: false,
      size: 8,
      tableData: []
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
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onSubmit() {
      this.size = 8; //每页数量
      this.current = 1; //页码
      this.getTableData();
    }
  },
  mounted() {
    this.getTableData();
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  }
};
</script>
<style lang="less" scoped></style>
