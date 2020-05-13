<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
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
      <a-form-model-item label="字典名称" prop="name">
        <a-input
          placeholder="字典名称"
          v-model.trim="formData.name"
          :maxLength="30"
        />
      </a-form-model-item>
      <a-form-model-item label="字典编号" prop="code">
        <a-input
          placeholder="字典编号"
          :disabled="dictionaryId != ''"
          v-model.trim="formData.code"
          :maxLength="30"
        />
      </a-form-model-item>
      <a-form-model-item label="字典值" prop="value">
        <a-input
          placeholder="字典值"
          v-model.trim="formData.value"
          :maxLength="30"
        />
      </a-form-model-item>
      <a-form-model-item label="字典说明" prop="remark">
        <a-input
          type="textarea"
          :maxLength="300"
          placeholder="字典说明"
          v-model.trim="formData.remark"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    dictionaryDetail: {
      required: false
    }
  },
  data() {
    return {
      formData: {
        name: "",
        code: "",
        value: "",
        remark: ""
      },
      dictionaryId: "",
      name: "",
      rules: {
        name: [{ required: true, trigger: "change", message: "输入字典名称" }],
        code: [{ required: true, trigger: "change", message: "输入字典编号" }],
        value: [{ required: true, trigger: "change", message: "输入字典编号" }]
      }
    };
  },
  computed: {
    title() {
      let title = this.dictionaryDetail ? "编辑字典" : "新建字典";
      return title;
    }
  },
  watch: {
    dictionaryDetail(nval) {
      if (nval) {
        this.dictionaryId = nval.id;
        setTimeout(() => {
          this.formData = {
            name: nval.name,
            code: nval.code,
            value: nval.value,
            remark: nval.remark
          };
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
      this.dictionaryId = "";
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.dictionaryId) {
          this.editdictionary(this.formData);
        } else {
          this.adddictionary(this.formData);
        }
      });
    },
    editdictionary(values) {
      let params = values;
      params.id = this.dictionaryId;
      this.$api.common.editSysDict(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改字典成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    adddictionary(values) {
      let params = values;
      this.$api.common.addSysDict(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建字典成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    }
  }
};
</script>
