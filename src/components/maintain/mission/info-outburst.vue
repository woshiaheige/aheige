<template>
  <a-modal
    title="突发任务详情"
    width="60%"
    :visible="visible"
    @cancel="closeModal"
  >
    <a-steps :current="missionStatus" size="small" v-margin:bottom="40">
      <a-step title="已创建" :description="detail.gmtCreate" />
      <a-step title="处理中" />
      <a-step title="已完成" :description="detail.gmtModified" />
      <a-step title="已延期" v-if="missionStatus == 3" />
      <a-step title="已关闭" />
    </a-steps>
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="运维小组">{{
        detail.groupName
      }}</a-descriptions-item>
      <a-descriptions-item label="运维人员">{{
        detail.handleName
      }}</a-descriptions-item>
      <a-descriptions-item label="运维时间">{{
        this.$moment(detail.gmtExecution).format("YYYY-MM-DD")
      }}</a-descriptions-item>
      <a-descriptions-item label="任务描述">{{
        detail.content
      }}</a-descriptions-item>
      <!-- <a-descriptions-item label="反馈结果" v-if="missionStatus == 2">
        {{ detail.result }}</a-descriptions-item
      > -->
      <a-descriptions-item label="反馈结果" v-if="detail.result">
        {{ detail.result }}</a-descriptions-item
      >
      <a-descriptions-item label="附件" v-if="detail.fileId">
        <a :href="fileDownload + detail.fileId">{{ detail.fileName }}</a>
      </a-descriptions-item>
    </a-descriptions>
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
    detail: {
      required: false
    }
  },
  computed: {
    missionStatus() {
      return this.detail.status - 1;
    }
  },
  data() {
    return {
      fileDownload: this.$api.common.fileDownload
    };
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
<style lang="less" scoped></style>
