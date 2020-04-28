<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    okText="提交"
    width="100%"
    style="top: 0;"
    wrapClassName="edit-article"
    :maskClosable="false"
  >
    <a-form :form="form">
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
          :filterOption="filterOptions"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of typeList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <editor v-model="content" v-if="showEditor" />
    </a-form>
  </a-modal>
</template>
<script>
import editor from "@/components/common/editor/editor";
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
      initDetail: "", //编辑时的初始数据
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
        this.initDetail = JSON.parse(JSON.stringify(nval));
        this.detailId = nval.id;
        this.content = nval.content;
        this.toggleEditor();
        this.$nextTick(() => {
          this.form.setFieldsValue({
            title: nval.title,
            classId: nval.classId
          });
        });
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
      this.showEditor = false;
      if (this.toggleEditorTimer) {
        clearTimeout(this.toggleEditorTimer);
      }
      this.toggleEditorTimer = setTimeout(() => {
        this.showEditor = true;
      }, 200);
    },
    closeModal() {
      let formData = this.form.getFieldsValue();
      if (this.detailId) {
        //编辑状态
        if (
          formData.classId != this.initDetail.classId ||
          formData.title != this.initDetail.title ||
          this.content != this.initDetail.content
        ) {
          console.log("修改了未保存");
          this.closeModalFn();
        } else {
          this.reset();
        }
      } else {
        //新增状态
        if (formData.title || this.content) {
          this.closeModalFn();
        } else {
          this.reset();
        }
      }
    },
    closeModalFn() {
      let that = this;
      this.$confirm({
        title: "确认退出",
        content: "文章尚未保存，确认退出？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.$emit("update:visible", false);
          that.reset();
        },
        onCancel() {}
      });
    },
    reset() {
      this.$emit("update:visible", false);
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
