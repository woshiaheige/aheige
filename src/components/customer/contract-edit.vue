<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal" @ok="submit">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="合同编号">
        <a-input
          v-decorator="[
            'num',
            { rules: [{ required: true, message: '请输入合同编号' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="合同客户企业">
        <a-select
          placeholder="请选择合同客户企业"
          v-decorator="[
            'enterprise',
            { rules: [{ required: true, message: '请选择合同客户企业' }] }
          ]"
        >
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同起止时间">
        <a-range-picker
          v-decorator="[
            'range-time-picker',
            { rules: [{ required: true, message: '请选择合同起止时间' }] }
          ]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item label="合同签署时间">
        <a-date-picker
          placeholder="选择合同签署时间"
          v-decorator="[
            'signTime',
            { rules: [{ required: true, message: '请选择合同签署时间' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="合同负责人">
        <a-select placeholder="请选择合同客户企业" v-decorator="['principal']">
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="主要负责小组">
        <a-select placeholder="请选择主要负责小组" v-decorator="['group']">
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同金额">
        <a-input v-decorator="['money']" />
      </a-form-item>
      <a-form-item label="合同说明">
        <a-input v-decorator="['detail']" type="textarea" />
      </a-form-item>
      <a-form-item label="合同附件">
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          v-decorator="['files', { rules: [{ message: '请上传文件' }] }]"
        >
          <a-button> <a-icon type="upload" /> 选择文件 </a-button>
        </a-upload>
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
    title: {
      default: "新增合同",
      type: String
    }
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "contractEdit" }),
      formValidate: {
        num: "",
        enterprise: "",
        startTime: "",
        endTime: "",
        signTime: "",
        principal: "",
        group: "",
        money: "",
        detail: ""
      },
      rules: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (err) {
          // 这里做逻辑处理
          console.log(values); // { name: '' }
        }
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // getBase64(info.file.originFileObj, imageUrl => {
        // });
      }
    },
    beforeUpload(file) {
      console.log(file);
      // const isJpgOrPng =
      //   file.type === "image/jpeg" || file.type === "image/png";
      // if (!isJpgOrPng) {
      //   this.$message.error("You can only upload JPG file!");
      // }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   this.$message.error("Image must smaller than 2MB!");
      // }
      // return isJpgOrPng && isLt2M;
    }
  }
};
</script>
