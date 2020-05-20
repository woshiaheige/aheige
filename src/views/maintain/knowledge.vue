<template>
  <div class="maintain">
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
        <a-col :span="6">
          <a-button type="primary" block @click="knowledgeTypeVisible = true"
            ><a-icon type="plus" />新建分类</a-button
          >
          <a-menu v-model="menu" mode="vertical">
            <a-menu-item :key="item.id" v-for="item of menuList">
              <span
                :title="item.name"
                style="width:calc(100% - 65px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;vertical-align:top;"
              >
                {{ item.name }}
              </span>

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
        <a-col :span="18">
          <a-list
            itemLayout="vertical"
            size="large"
            :dataSource="tableData"
            :loading="loading"
          >
            <a-list-item slot="renderItem" slot-scope="item" key="item.id">
              <template slot="actions">
                <a @click="onDetail(item)">查看更多</a>
              </template>
              <template slot="actions">
                <a @click="onEdit(item)">编辑</a>
              </template>
              <template slot="actions">
                <a @click="onDelete(item)">删除</a>
              </template>
              <!-- <img slot="extra" width="220" alt="logo" :src="item.img" /> -->
              <a-list-item-meta>
                <a slot="title" @click="onDetail(item)">{{ item.title }}</a>
                <!-- <div slot="description">
                  <a-tag color="blue">{{ item.className }}</a-tag>
                </div> -->
              </a-list-item-meta>
              <div
                v-html="item.content"
                class="article-content ql-snow ql-editor"
              ></div>
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
  name: "knowledge",
  components: { addEdit, typeEdit, articleModal },
  data() {
    return {
      listData: [],
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
          this.menuList = res.data.data;
          this.menu = [res.data.data[0].id];
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
      this.listData = [];
      this.$api.maintain
        .article(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            // this.tableData.forEach(item => {
            //   this.listData.push({
            //     id: item.id,
            //     title: `${item.title}`,
            //     type: `${item.className}`,
            //     content: `${item.content}`,
            //     img:
            //       "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            //   });
            // });
            this.total = +res.data.data.total;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onEditKnowledgeType(row) {
      this.$api.maintain.getClassById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.knowledgeTypeDetail = res.data.data;
          this.knowledgeTypeVisible = true;
        }
      });
    },
    onDeleteKnowledgeType(row) {
      let _this = this;
      this.$confirm({
        title: "删除" + row.name,
        content: `将删除该分类下所有文章，确定删除吗?`,
        onOk() {
          console.log("OK");
          _this.$api.maintain.deleteKnowledgeClass({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("删除成功");
              _this.knowledgeClass();
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
        }
      });
    },
    onDetail(row) {
      this.$router.push({
        path: "/maintain/knowledge/article",
        query: { id: row.id }
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
    cancel(value) {
      this.obj.show = value;
      this.typeObj.show = value;
    }
  },
  mounted() {
    this.knowledgeClass();
    // this.getTableData();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "maintain-knowledge-article") {
      let arr = [];
      arr.push("knowledge");
      this.$store.dispatch("createIncludeArr", arr);
    } else {
      this.$store.dispatch("createIncludeArr", []);
    }
    next();
  }
};
</script>
<style lang="less" scoped></style>
