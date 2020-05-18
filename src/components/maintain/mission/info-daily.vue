<template>
  <a-modal
    width="60%"
    title="例行任务详情"
    :visible="visible"
    @cancel="closeModal"
  >
    <a-steps :current="missionStatus" size="small" v-margin:bottom="40">
      <a-step title="待处理" :description="detail.gmtCreate" />
      <a-step title="处理中" />
      <a-step
        title="已完成"
        :description="detail.gmtModified"
        v-if="missionStatus != 3"
      />
      <a-step
        title="已关闭"
        v-if="missionStatus == 3"
        :description="detail.gmtModified"
      />
    </a-steps>
    <div class="description-wrapper">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="运维小组">{{
          detail.groupName
        }}</a-descriptions-item>
        <a-descriptions-item label="运维人员" v-if="detail.handleName">{{
          detail.handleName
        }}</a-descriptions-item>
        <a-descriptions-item label="运维时间">{{
          this.$moment(detail.gmtExecution).format("YYYY-MM-DD")
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
                <a-icon
                  type="check"
                  style="color:green"
                  v-if="item.isState == 1"
              /></span>
            </div>
          </template>
        </a-descriptions-item>
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
      return this.detail.status - 1;
    }
  },
  data() {
    return {
      fileViewOnline: this.$api.common.fileViewOnline
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
