<template>
  <div>
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">知识库设置</div>
        <div class="extra">
          <a-form layout="inline" :model="formInline">
            <a-form-item>
              <a-button type="primary" @click="onEdit()">
                <a-icon type="plus" />新建文章
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-input-search
                placeholder="请输入文章名称"
                style="width: 200px"
                @search="onSubmit"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <a-row :gutter="16">
        <a-col :span="4">
          <a-button type="dashed" block>新建分类</a-button>
          <a-menu
            v-model="current"
            mode="vertical"
            :defaultSelectedKeys="['type1']"
          >
            <a-menu-item key="type1">
              操作手册
            </a-menu-item>
            <a-menu-item key="type2">
              运维政策
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="20">
          <a-table
            size="middle"
            :columns="columns"
            :dataSource="tableData"
            :pagination="false"
          >
            <span slot="action" slot-scope="row">
              <a @click="onEdit(row)">查看</a>
              <a-divider type="vertical" />
              <a @click="onEdit(row)">编辑</a>
              <a-divider type="vertical" />
              <a @click="onDelete(row)">删除</a>
            </span>
          </a-table>
          <a-pagination
            size="small"
            v-margin:top="16"
            showQuickJumper
            showSizeChanger
            :defaultCurrent="current"
            :total="total"
          />
          <add-edit :obj="obj" @cancel="cancel"></add-edit>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import addEdit from "@/components/knowledge/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      current: ["type1"],
      total: 0,
      columns: [
        {
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "知识库分类",
          dataIndex: "type"
        },
        {
          title: "创建人",
          dataIndex: "name"
        },
        {
          title: "创建时间",
          dataIndex: "time"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
      obj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getAnnouncementList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
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
        content: "是否删除",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    cancel(value) {
      this.obj.show = value;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
