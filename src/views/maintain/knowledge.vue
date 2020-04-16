<template>
  <a-card :bordered="false" class="knowledge">
    <span slot="title">运维知识库</span>
    <a-form layout="inline">
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="onEdit()">
          新增文章
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          @click="$router.push({ path: '/knowledge/type' })"
        >
          知识库分类
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      size="middle"
      :columns="columns"
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
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>
<script>
import addEdit from "@/components/knowledge/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      total: 0,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`
        },
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
