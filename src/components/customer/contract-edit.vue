<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <a-form
      ref="formModal"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="合同编号" prop="num">
        <a-input v-model="form.num" />
      </a-form-item>
      <a-form-item label="合同客户企业" prop="enterprise">
        <a-select placeholder="请选择合同客户企业">
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同起止时间" prop="enterpriseCode">
        <a-row type="flex">
          <a-col :span="10">
            <a-date-picker placeholder="选择开始时间" />
          </a-col>
          <a-col style="margin:0 10px">
            <span>至</span>
          </a-col>
          <a-col :span="10">
            <a-date-picker placeholder="选择介绍时间" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="合同签署时间" prop="enterpriseCode">
        <a-date-picker placeholder="选择合同签署时间" />
      </a-form-item>
      <a-form-item label="合同负责人" prop="principal">
        <a-select placeholder="请选择合同客户企业">
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="主要负责小组" prop="group">
        <a-select placeholder="请选择主要负责小组">
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="合同金额" prop="money">
        <a-input v-model="form.money" />
      </a-form-item>
      <a-form-item label="合同说明" prop="detail">
        <a-input v-model="form.detail" type="textarea" />
      </a-form-item>
      <a-form-item label="合同附件" prop="logo">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="form.logo" :src="form.logo" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
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
      default: "添加新的企业",
      type: String
    }
  },
  data() {
    return {
      loading: false,
      form: {
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
