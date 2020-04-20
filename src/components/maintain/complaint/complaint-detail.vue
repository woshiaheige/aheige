<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-descriptions>
      <a-descriptions-item label="上报客户">小张</a-descriptions-item>
      <a-descriptions-item label="手机号码">1810000000</a-descriptions-item>
      <a-descriptions-item label="投诉内容"
        >我使用的账号有异常</a-descriptions-item
      >
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
    complainDetail: {
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      complainId: ""
    };
  },
  computed: {
    title() {
      return "投诉详情";
    }
  },
  watch: {
    complainDetail(nval) {
      if (nval) {
        this.complainId = nval.id;
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
