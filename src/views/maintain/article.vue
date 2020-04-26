<template>
  <div>
    <a-card :bordered="false" class="maintain" v-margin:top="16">
      <div class="card-header">
        <div class="title">{{ articleDetail.title }}</div>
        <div class="extra">
          文章分类：
          <a-tag color="blue">{{ articleDetail.className }}</a-tag>
        </div>
      </div>
      <div v-html="articleDetail.content" class="article-detail"></div>
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
    }
  }
};
</script>

<style></style>
