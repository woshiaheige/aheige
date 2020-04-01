<template>
  <a-modal title="新增报告模板" :visible="visible" @cancel="closeModal">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="模板名称">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入模板名称' }] }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="关联类型"
        extra="注：关联类型在新建模板时选定后，以后无法修改"
      >
        <a-radio-group v-decorator="['relationType', { initialValue: 1 }]">
          <a-radio
            :value="item.id"
            v-for="(item, index) of relationTypeList"
            :key="index"
            >{{ item.label }}</a-radio
          >
        </a-radio-group>
      </a-form-item>
      <a-form-item label="模板文件" extra="上传文件大小请控制在2M内">
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          v-decorator="[
            'files',
            { rules: [{ required: true, message: '请上传文件' }] }
          ]"
        >
          <a-button> <a-icon type="upload" /> 选择文件 </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        label="合并生成报告"
        extra="选中后，相关任务项中的数据将会合并"
      >
        <a-switch v-decorator="['switch']" defaultChecked />
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
    }
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "templateEdit" }),
      relationTypeList: [
        { label: "任务", id: 1 },
        { label: "工作流程", id: 2 }
      ],
      rules: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    }
  }
};
</script>
