<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="closeModal"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="行业名称" prop="name">
        <a-input
          placeholder="请输入"
          :maxLength="30"
          v-model.trim="formData.name"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="closeModal">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
      </a-button>
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
    industryDetail: {
      required: false
    }
  },
  data() {
    return {
      formData: {
        name: ""
      },
      industryId: "",
      rules: {
        name: [{ required: true, trigger: "change", message: "请输入行业名称" }]
      }
    };
  },
  computed: {
    title() {
      let title = this.industryDetail ? "编辑行业" : "新建行业";
      return title;
    }
  },
  watch: {
    industryDetail(nval) {
      if (nval) {
        this.industryId = nval.id;
        setTimeout(() => {
          this.formData.name = nval.name;
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
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.industryId) {
          this.editIndustry(this.formData);
        } else {
          this.addIndustry(this.formData);
        }
      });
    },
    editIndustry(values) {
      let params = values;
      params.id = this.industryId;
      this.$api.platform
        .updateSysIndustry(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("修改成功");
            this.$emit("updateTable");
            this.closeModal();
          }
        })
        .catch(() => {
          this.closeModal();
        });
    },
    addIndustry(values) {
      let params = values;
      this.$api.platform
        .addSysIndustry(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("添加成功");
            this.$emit("updateTable");
            this.closeModal();
          }
        })
        .catch(() => {
          this.closeModal();
        });
    }
  }
};
</script>
