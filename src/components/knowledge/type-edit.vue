<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="分类名称">
        <a-input
          placeholder="请输入"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入分类名称' }] }
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
    detail: {
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, "knowledgeEdit"),
      knowledgeId: ""
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
      this.knowledgeId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.knowledgeId) {
            this.editknowledge(values);
          } else {
            this.addknowledge(values);
          }
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
        } else {
          this.$message.error(res.data.msg);
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
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
