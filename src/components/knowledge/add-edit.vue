<template>
  <a-modal
    :title="title + '知识库文章'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="600"
    okText="保存"
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
            'type',
            { rules: [{ required: true, message: '请选择知识库分类' }] }
          ]"
        >
          <a-select-option value="1">操作手册</a-select-option>
        </a-select>
      </a-form-item>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
      >
      </quill-editor>
    </a-form>
  </a-modal>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import setTitle from "@/assets/lib/set-quill-title.js";
export default {
  components: { quillEditor },
  props: {
    obj: Object
  },
  data() {
    return {
      title: "新建",
      form: this.$form.createForm(this),
      content: "",
      editorOption: {}
    };
  },
  computed: {
    status: {
      get() {
        return this.obj.show;
      },
      set() {}
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    handleOk() {
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("cancel", false);
    },
    // 失去焦点事件
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    // 获得焦点事件
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    //转码：后台返回的内容字符串
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    }
  },
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        setTimeout(() => {
          setTitle.addQuillTitle();
        }, 100);
        if (this.obj.row != "" && this.obj.row != undefined) {
          this.title = "编辑";
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
