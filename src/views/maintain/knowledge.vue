<template>
  <div>
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">知识库设置</div>
        <div class="extra">
          <a-form layout="inline">
            <a-form-item>
              <a-button type="primary" @click="onEdit(false)">
                <a-icon type="plus" />新建文章
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-input-search
                placeholder="请输入文章名称"
                style="width: 200px"
                v-model="formInline.title"
                @search="search"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <a-row :gutter="16">
        <a-col :span="4">
          <a-button type="dashed" block @click="knowledgeTypeVisible = true"
            >新建分类</a-button
          >
          <a-menu v-model="menu" mode="vertical">
            <a-menu-item :key="item.id" v-for="item of menuList">
              {{ item.name }}
              <a-divider type="vertical" v-show="menu == item.id" />
              <a-icon
                type="edit"
                v-show="menu == item.id"
                @click="onEditKnowledgeType(item)"
              />
              <a-icon
                type="delete"
                v-show="menu == item.id"
                @click="onDeleteKnowledgeType(item)"
              />
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="20">
          <a-table
            :loading="loading"
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="tableData"
            :pagination="false"
          >
            <span slot="action" slot-scope="row">
              <a @click="onDetail(row)">查看</a>
              <a-divider type="vertical" />
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
          <!-- 新建编辑文章 -->
          <add-edit
            :visible.sync="articleVisible"
            :detail="articleDetail"
            :typeList="menuList"
            :type="menu"
            @updateTable="getTableData"
          ></add-edit>

          <!-- 新增编辑类型 -->
          <type-edit
            :visible.sync="knowledgeTypeVisible"
            :detail="knowledgeTypeDetail"
            @updateTable="knowledgeClass"
          />
          <article-modal
            :visible.sync="articleDetailVisible"
            :detail="articleModalDetail"
          ></article-modal>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import addEdit from "@/components/knowledge/add-edit";
import typeEdit from "@/components/knowledge/type-edit";
import articleModal from "@/components/knowledge/article-modal";
export default {
  components: { addEdit, typeEdit, articleModal },
  data() {
    return {
      formInline: { title: "" },
      loading: false,
      knowledgeTypeVisible: false, //分类
      knowledgeTypeDetail: "",
      articleVisible: false, //文章
      articleDetailVisible: false, //文章详情
      articleDetail: "",
      articleModalDetail: "",
      menuList: [],
      menu: [],
      current: 1,
      total: 0,
      size: 10,
      columns: [
        {
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "知识库分类",
          dataIndex: "className"
        },
        {
          title: "创建人",
          dataIndex: "userName"
        },
        {
          title: "创建时间",
          dataIndex: "gmtCreate"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
      obj: {
        show: false
      },
      typeObj: {
        show: false
      }
    };
  },
  watch: {
    menu() {
      this.onSubmit();
    }
  },
  methods: {
    search() {
      //不以分类搜索
      this.current = 1;
      this.menu = [];
      let params = {
        size: this.size,
        page: this.current,
        title: this.formInline.title
      };
      this.loading = true;
      this.$api.maintain
        .article(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
            if (this.tableData.length != 0) {
              this.menu = [this.tableData[0].classId];
            }
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    knowledgeClass() {
      this.$api.maintain.knowledgeClass().then(res => {
        if (res.data.state == 0) {
          this.menuList = res.data.data.records;
          this.menu = [res.data.data.records[0].id];
        }
      });
    },
    getTableData() {
      let params = {
        size: this.size,
        page: this.current,
        classId: this.menu[0],
        title: this.formInline.title
      };
      this.loading = true;
      this.$api.maintain
        .article(params)
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
    onEditKnowledgeType(row) {
      this.knowledgeTypeVisible = true;
      this.knowledgeTypeDetail = row;
    },
    onDeleteKnowledgeType(row) {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除分类 ${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.maintain.deleteKnowledgeClass({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("删除成功");
              _this.knowledgeClass();
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
    onEdit(row) {
      if (row == false) {
        //新增
        this.articleVisible = true;
        this.articleDetail = "";
        return;
      }
      this.$api.maintain.getArticleById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.articleVisible = true;
          this.articleDetail = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onDetail(row) {
      //查看详情
      this.$api.maintain.getArticleById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.articleDetailVisible = true;
          this.articleModalDetail = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    onDelete(row) {
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除文章 ${row.title}`,
        onOk() {
          console.log("OK");
          _this.$api.maintain
            .deleteKnowledgeArticle({ id: row.id })
            .then(res => {
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
    cancel(value) {
      this.obj.show = value;
      this.typeObj.show = value;
    }
  },
  mounted() {
    this.knowledgeClass();
    // this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
