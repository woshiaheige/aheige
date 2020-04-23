<template>
  <a-modal title="方案详情" :visible="visible" @cancel="closeModal">
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="运维小组">{{
        detail.groupName
      }}</a-descriptions-item>
      <a-descriptions-item label="运维人员">{{
        detail.handleName
      }}</a-descriptions-item>
      <a-descriptions-item label="运维时间">{{
        detail.gmtCreate
      }}</a-descriptions-item>
      <a-descriptions-item label="方案项">
        <template v-if="detail.taskItemVos">
          <div
            v-for="(item, index) of detail.taskItemVos"
            :key="index"
            v-margin.bottom="5"
          >
            {{ item.name }}
          </div>
        </template>
      </a-descriptions-item>
      <a-descriptions-item label="附件">
        <div v-for="(item, index) of detail.file" :key="index">
          {{ item.name }}
        </div>
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
  data() {
    return {};
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
