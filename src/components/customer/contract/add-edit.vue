<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal" @ok="submit">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="所属企业">
        <a-select
          placeholder="所属企业"
          v-decorator="[
            'num',
            { rules: [{ required: true, message: '请选择所属企业' }] }
          ]"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="合同编号">
        <a-input
          placeholder="合同编号"
          v-decorator="[
            'num',
            { rules: [{ required: true, message: '请输入合同编号' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="起止时间">
        <a-range-picker
          v-decorator="[
            'range-time-picker',
            { rules: [{ required: true, message: '请选择合同起止时间' }] }
          ]"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-form-item label="合同负责人">
        <a-select placeholder="合同负责人"> </a-select>
      </a-form-item>
      <a-form-item label="合同金额">
        <a-input placeholder="合同金额" />
      </a-form-item>
      <a-form-item label="合同备注">
        <a-input type="textarea" placeholder="合同备注" />
      </a-form-item>
      <a-form-item label="合同状态">
        <a-select placeholder="合同状态"></a-select>
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
    contractId: {
      required: false,
      default: ""
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
  computed: {
    title() {
      return this.contractId !== "" ? "编辑合同" : "新增合同";
    }
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
    }
  }
};
</script>
