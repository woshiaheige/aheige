<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :maskClosable="false"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="反馈意见">
        <a-input
          placeholder="请输入"
          type="textarea"
          v-decorator="[
            'content',
            { rules: [{ required: true, message: '请输入反馈意见' }] }
          ]"
        />
      </a-form-item>
    </a-form>
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
    return {
      form: this.$form.createForm(this),
      complaintId: ""
    };
  },
  computed: {
    title() {
      return "投诉处理";
    }
  },
  watch: {
    complaintDetail(nval) {
      if (nval) {
        this.complaintId = nval.id;
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.complaintId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.editManageComplaint(values);
        }
      });
    },
    editManageComplaint(values) {
      let params = values;
      params.id = this.complaintId;
      params.state = 3; //处理
      this.$api.maintain.editManageComplaint(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("提交成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    }
  }
};
</script>
