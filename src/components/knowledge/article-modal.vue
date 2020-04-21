<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="标题">{{ detail.title }}</a-descriptions-item>
      <a-descriptions-item label="知识库分类">{{
        detail.className
      }}</a-descriptions-item>
      <a-descriptions-item label="详情" class="ql-container ql-snow">
        <div v-html="detail.content" class="article-detail"></div>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    detail: {
      required: true,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return "文章详情";
    }
  },
  watch: {
    detail(nval) {
      if (nval) {
        console.log(nval);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style>
.article-detail img {
  max-width: 100%;
}
</style>
