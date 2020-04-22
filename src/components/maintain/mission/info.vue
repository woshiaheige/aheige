<template>
  <a-modal title="方案详情" :visible="visible" @cancel="closeModal">
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="运维小组"></a-descriptions-item>
      <a-descriptions-item label="运维人员">{{
        detail.handleName
      }}</a-descriptions-item>
      <a-descriptions-item label="运维时间">{{
        detail.gmtCreate
      }}</a-descriptions-item>
      <a-descriptions-item label="方案项">
        内容1
        <br />
        内容2
        <br />
        内容3
        <br />
        内容4
        <br />
        内容5
        <br />
        内容6<br />
      </a-descriptions-item>
      <a-descriptions-item label="附件"
        ><a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      /></a-descriptions-item>
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
