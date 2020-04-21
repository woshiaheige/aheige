<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="标题">{{ detail.title }}</a-descriptions-item>
      <a-descriptions-item label="知识库分类">张三</a-descriptions-item>
      <a-descriptions-item label="详情">
        <div v-html="detail.content"></div>
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
      required: false
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
    }
  }
};
</script>
