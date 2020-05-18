<template>
  <div>
    <a-card :bordered="false" class="maintain" v-margin:top="16">
      <div class="card-header">
        <div class="title" v-fontsize="36">{{ articleDetail.title }}</div>
        <div class="extra">
          文章分类：
          <a-tag color="blue">{{ articleDetail.className }}</a-tag>
        </div>
      </div>
      <div
        class="fileList"
        v-for="(file, index) of articleDetail.fileEntities"
        :key="index"
      >
        <a @click="onDown(file)">{{ file.fileName }}</a>
      </div>
      <div class="ql-snow ql-editor" v-html="articleDetail.content" />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleDetail: {}
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$api.maintain
        .getArticleById({ id: this.$route.query.id })
        .then(res => {
          if (res.data.state == 0) {
            this.articleDetail = res.data.data;
          }
        });
    },
    onDown(row) {
      if (row.fileId == null) {
        this.$message.warn("没有附件");
        return;
      }
      this.$api.customer.downloadFile({ id: row.fileId }).then(() => {
        window.location.href =
          this.$api.base.api + "files/download/file/" + row.fileId;
      });
    }
  }
};
</script>

<style></style>
