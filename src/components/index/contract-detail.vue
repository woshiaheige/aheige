<template>
  <a-modal
    title="合同到期提醒"
    :visible="modelData.show"
    @cancel="handleCancel"
  >
    <a-descriptions :column="1" bordered>
      <a-descriptions-item label="所属企业">{{
        info.enterpriseName
      }}</a-descriptions-item>
      <a-descriptions-item label="合同编号">{{
        info.number
      }}</a-descriptions-item>
      <a-descriptions-item label="合同开始时间">{{
        info.gmtBegin
      }}</a-descriptions-item>
      <a-descriptions-item label="合同结束时间">{{
        info.gmtEnd
      }}</a-descriptions-item>
      <a-descriptions-item label="合同负责人">{{
        info.userName
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
      this.$api.index.getContractById({ id: id }).then(res => {
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
