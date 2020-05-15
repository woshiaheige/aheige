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
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
    >
      <a-form-model-item label="文章标题" prop="title">
        <a-input
          placeholder="请输入"
          v-model.trim="formData.title"
          :maxLength="30"
        />
      </a-form-model-item>
      <a-form-model-item label="知识库分类" prop="classId">
        <a-select
          placeholder="请选择"
          v-model="formData.classId"
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
      </a-form-model-item>
      <a-form-model-item label="附件">
        <a-upload
          name="file"
          :multiple="true"
          :action="serverUrl"
          :fileList="fileList"
          @change="handleChange"
          :remove="handleRemove"
          :beforeUpload="beforeUpload"
          :headers="{
            token: token
          }"
        >
          <a-button> <a-icon type="upload" /> 选择文件 </a-button>
          <span v-margin:left="10">上传文件大小不能超过10MB</span>
        </a-upload>
      </a-form-model-item>
      <editor v-model="content" v-if="showEditor" />
    </a-form-model>
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
      formData: {
        title: "",
        classId: undefined
      },
      content: "",
      detailId: "",
      showEditor: false,
      toggleEditorTimer: "",
      rules: {
        classId: [
          {
            required: true,
            message: "请选择知识库分类",
            trigger: "change"
          }
        ],
        title: [
          { required: true, trigger: "change", message: "请输入文章标题" }
        ]
      },
      serverUrl: this.$api.common.uploadFileArr, // 上传图片服务器地址
      fileList: [],
      token: JSON.parse(sessionStorage.getItem("userinfo")).token
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
          this.formData = {
            title: nval.title,
            classId: nval.classId
          };
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
          // this.form.setFieldsValue({ classId: this.type[0] });
          this.formData.classId = this.type[0];
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
      if (this.detailId) {
        //编辑状态
        if (
          this.formData.classId != this.initDetail.classId ||
          this.formData.title != this.initDetail.title ||
          this.content != this.initDetail.content
        ) {
          // console.log("修改了未保存");
          this.closeModalFn();
        } else {
          this.reset();
        }
      } else {
        //新增状态
        if (this.formData.title || this.content) {
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
      this.$refs.ruleForm.clearValidate();
      this.formData = {
        title: "",
        classId: undefined
      };
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.detailId) {
          this.editknowledge(this.formData);
        } else {
          this.addknowledge(this.formData);
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
    },
    beforeUpload(file) {
      this.isError = false;
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        this.isError = true;
      }
      return isLt10M;
    },
    handleChange(info) {
      console.log(info);
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      if (this.isError) {
        return;
      }
      this.fileList = fileList;
      if (info.file.status === "done") {
        this.formData.files = [];
        let temp = {};
        temp.fileId = info.file.response.data;
        temp.fileName = info.file.name;
        this.formData.files.push(temp);
        this.$message.success("上传成功");
      } else if (info.file.status === "error") {
        this.$message.error("上传失败");
      }
    },
    //删除文件
    handleRemove(file) {
      this.formData.files.forEach((item, index) => {
        if (item.fileId == file.id) {
          this.formData.files.splice(index, 1);
          // this.delFile(file.id);
        }
      });
    },
    delFile(id) {
      let data = {
        contractId: this.modelData.row.id || "", //合同ID
        fileId: id //文件ID
      };
      this.$api.customer.delContractFile(data).then(() => {});
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
