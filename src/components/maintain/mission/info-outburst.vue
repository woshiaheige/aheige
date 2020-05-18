<template>
  <a-modal
    title="突发任务详情"
    width="60%"
    :visible="visible"
    @cancel="closeModal"
  >
    <a-steps :current="missionStatus" size="small" v-margin:bottom="40">
      <a-step title="待处理" :description="detail.gmtCreate" />
      <a-step title="处理中" />
      <a-step
        title="已完成"
        :description="detail.gmtModified"
        v-if="statusType == 'finish'"
      />
      <a-step
        title="已关闭"
        v-if="statusType == 'close'"
        :description="detail.gmtModified"
      />
    </a-steps>
    <div class="description-wrapper">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="任务名称">{{
          detail.name
        }}</a-descriptions-item>
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
        <a-descriptions-item label="反馈结果" v-if="detail.result">
          {{ detail.result }}</a-descriptions-item
        >
        <a-descriptions-item label="附件" v-if="detail.fileIds">
          <img
            v-for="(item, index) of detail.fileIds"
            :key="index"
            v-image-preview
            :src="fileViewOnline + item"
            alt=""
            style="width:100px;height:100px;object-fit:cover;margin:5px"
          />
        </a-descriptions-item>
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
    detail: {
      required: false
    }
  },
  computed: {
    missionStatus() {
      if (this.detail.status == 3) {
        //已完成
        return this.detail.status + 1;
      } else if (this.detail.status == 4) {
        //已关闭
        return this.detail.status - 1;
      } else {
        //待处理，处理中
        return this.detail.status - 1;
      }
    },
    statusType() {
      //关闭流程还是正常的完成流程
      if (this.detail.status == 3) {
        //已完成
        return "finish";
      } else if (this.detail.status == 4) {
        //已关闭
        return "close";
      } else {
        //待处理，处理中
        return "finish";
      }
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
