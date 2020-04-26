<template>
  <a-modal title="投诉信息" :visible="modelData.show" @cancel="handleCancel">
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="投诉人">{{
        info.userName
      }}</a-descriptions-item>
      <a-descriptions-item label="投诉内容">{{
        info.content
      }}</a-descriptions-item>
    </a-descriptions>
    <template slot="footer">
      <a-button type="primary" @click="closeReminds">关闭报警</a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      info: {},
      id: ""
    };
  },
  computed: {
    modelData() {
      console.log(this.value);
      return this.value;
    }
  },
  methods: {
    handleCancel() {
      this.modelData.show = false;
    },
    getDetail(id, msgId) {
      this.id = msgId;
      this.$api.index.getComplaintById({ id: id }).then(res => {
        if (res.data.state == 0) {
          this.info = res.data.data;
        }
      });
    },
    closeReminds() {
      let data = {
        id: this.id,
        status: 1 //0:未处理 1已处理
      };
      let that = this;
      this.$api.index.closeMsg(data).then(res => {
        if (res.data.state == 0) {
          that.modelData.show = false;
          that.$emit("refresh");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
