<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
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
    },
    reset() {
      this.complainId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.complainId) {
            this.editComplain(values);
          } else {
            this.addComplain(values);
          }
        }
      });
    },
    editComplain(values) {
      let params = values;
      params.id = this.complainId;
      this.$api.organization.editSyscomplain(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改小组成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addComplain(values) {
      let params = values;
      this.$api.organization.addSyscomplain(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建小组成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
