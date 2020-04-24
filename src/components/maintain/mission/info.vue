<template>
  <a-modal title="任务详情" :visible="visible" @cancel="closeModal">
    <a-steps :current="missionStatus" size="small" v-margin:bottom="40">
      <a-step title="已创建" />
      <a-step title="处理中" />
      <a-step title="已完成" />
      <a-step title="已延期" v-if="missionStatus == 4" />
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
        this.$moment(detail.gmtCreate).format("YYYY-MM-DD")
      }}</a-descriptions-item>
      <a-descriptions-item label="运维项目">
        <template v-if="detail.taskItemVos">
          <div
            v-for="(item, index) of detail.taskItemVos"
            :key="index"
            v-margin.bottom="5"
          >
            <span
              >{{ item.name }}
              <a-icon type="check" style="color:green" v-if="item.isState == 1"
            /></span>
          </div>
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="附件">
        <!-- <div v-for="(item, index) of detail.fileId" :key="index">
          {{ item.name }}
        </div> -->
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
      return this.detail.status;
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
