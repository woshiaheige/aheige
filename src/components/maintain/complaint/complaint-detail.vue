<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <div class="description-wrapper">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="上报客户">{{
          complaintDetail.userName
        }}</a-descriptions-item>
        <a-descriptions-item label="手机号码">{{
          complaintDetail.contact
        }}</a-descriptions-item>
        <a-descriptions-item label="投诉内容">{{
          complaintDetail.content
        }}</a-descriptions-item>
        <a-descriptions-item
          v-if="
            complaintDetail.opinion != null && complaintDetail.opinion != 'null'
          "
          label="反馈意见"
          >{{ complaintDetail.opinion }}</a-descriptions-item
        >
      </a-descriptions>
    </div>
    <template slot="footer">
      <a-button key="back" @click="closeModal">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    complaintDetail: {
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return "投诉详情";
    }
  },
  watch: {
    complaintDetail(nval) {
      if (nval) {
        this.complainId = nval.id;
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.complainId = "";
    },
    handleOk() {
      this.$emit("update:visible", false);
      this.reset();
    }
  }
};
</script>
