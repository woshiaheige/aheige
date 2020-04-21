<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="反馈意见">
        <a-input
          placeholder="请输入"
          type="textarea"
          v-decorator="[
            'name',
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
    industryDetail: {
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      industryId: ""
    };
  },
  computed: {
    title() {
      return "投诉处理";
    }
  },
  watch: {
    industryDetail(nval) {
      if (nval) {
        this.industryId = nval.id;
        setTimeout(() => {
          this.form.setFieldsValue({
            name: nval.name
          });
        }, 50);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.industryId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.editIndustry(values);
        }
      });
    },
    editIndustry(values) {
      let params = values;
      params.id = this.industryId;
      this.$api.platform.updateSysIndustry(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改行业成功");
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
