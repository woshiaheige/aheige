<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :width="600"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="文章标题">
        <a-input
          placeholder="请输入"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '请输入文章标题' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="知识库分类">
        <a-select
          placeholder="请选择"
          v-decorator="[
            'classId',
            { rules: [{ required: true, message: '请选择知识库分类' }] }
          ]"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of typeList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <editor v-model="content" v-if="showEditor" style="width:100%" />
    </a-form>
  </a-modal>
</template>
<script>
import editor from "@/components/common/editor";
export default {
  components: { editor },
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    detail: {
      required: false
    },
    typeList: {
      //知识库分类
      required: true,
      default: function() {
        return [];
      }
    },
    type: {
      required: false //选中状态的知识库分类
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      content: "",
      editorOption: {},
      detailId: "",
      showEditor: false,
      toggleEditorTimer: ""
    };
  },
  computed: {
    title() {
      let title = this.detail ? "编辑文章" : "新建文章";
      return title;
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  watch: {
    detail(nval) {
      if (nval) {
        this.detailId = nval.id;
        this.content = nval.content;
        this.toggleEditor();
        setTimeout(() => {
          this.form.setFieldsValue({
            title: nval.title,
            classId: nval.classId
          });
        }, 50);
      }
    },
    visible(nval) {
      if (nval) {
        this.toggleEditor();
      }
      if (nval && this.type && !this.detail) {
        //新增
        setTimeout(() => {
          this.form.setFieldsValue({ classId: this.type[0] });
        }, 50);
      }
    }
  },
  methods: {
    toggleEditor() {
      //避免富文本无法加载数据
      if (this.toggleEditorTimer) {
        clearTimeout(this.toggleEditorTimer);
      }
      this.toggleEditorTimer = setTimeout(() => {
        this.showEditor = true;
      }, 200);
    },
    closeModal() {
      this.showEditor = false;
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.content = "";
      this.detailId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.detailId) {
            this.editknowledge(values);
          } else {
            this.addknowledge(values);
          }
        }
      });
    },
    editknowledge(values) {
      let params = values;
      params.content = this.content;
      params.id = this.detailId;
      this.$api.maintain.updateKnowledgeArticle(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改文章成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    addknowledge(values) {
      let params = values;
      params.content = this.content;
      this.$api.maintain.addKnowledgeArticle(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建文章成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
