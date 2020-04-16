<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="行业名称">
        <a-input
          placeholder="行业名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '输入行业名称' }] }
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
      let title = this.industryDetail ? "编辑行业" : "新增行业";
      return title;
    }
  },
  watch: {
    industryDetail(nval) {
      if (nval.detail) {
        let detail = nval.detail;
        this.industryId = nval.detail.id;
        this.form.setFieldsValue({
          number: detail.number
        });
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.industryId) {
            this.editIndustry(values);
          } else {
            this.addIndustry(values);
          }
        }
      });
    },
    editIndustry(values) {
      let params = values;
      params.id = this.industryId;
      this.$api.platform.updateSysIndustry(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建行业成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addIndustry(values) {
      let params = values;
      this.$api.platform.addSysIndustry(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建行业成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
