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
      <a-form-model-item label="分类名称" prop="name">
        <a-input
          placeholder="请输入"
          v-model.trim="formData.name"
          :maxLength="30"
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
    detail: {
      required: false
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value == undefined || value == "") {
        callback("请输入分类");
        return;
      }
      if (value.length > 30) {
        callback("分类长度不能超过30位");
      } else {
        callback();
      }
    };
    return {
      formData: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            validator: validateName
          }
        ]
      }
    };
  },
  computed: {
    title() {
      let title = this.detail ? "编辑知识库分类" : "新建知识库分类";
      return title;
    }
  },
  watch: {
    detail(nval) {
      if (nval) {
        this.knowledgeId = nval.id;
        this.formData = {
          name: nval.name,
          sort: nval.sort
        };
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.knowledgeId = "";
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.knowledgeId) {
          this.editknowledge(this.formData);
        } else {
          this.addknowledge(this.formData);
        }
      });
    },
    editknowledge(values) {
      let params = values;
      params.id = this.knowledgeId;
      this.$api.maintain.updateKnowledgeClass(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改知识库分类成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    addknowledge(values) {
      let params = values;
      this.$api.maintain.addKnowledgeClass(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建知识库分类成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    }
  }
};
</script>
