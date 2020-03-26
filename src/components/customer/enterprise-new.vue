<template>
  <a-modal title="添加新的企业" :visible="visible" @cancel="closeModal">
    <a-form
      ref="formModal"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="客户企业名称" prop="name">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item label="组织企业代码证" prop="enterpriseCode">
        <a-input v-model="form.enterpriseCode" />
      </a-form-item>
      <a-form-item label="统一社会信用代码" prop="enterpriseCode">
        <a-input v-model="form.enterpriseCode" />
      </a-form-item>
      <a-form-item label="联系人" prop="contact">
        <a-input v-model="form.contact" />
      </a-form-item>
      <a-form-item label="企业电话号码" prop="phone">
        <a-input v-model="form.phone" />
      </a-form-item>
      <a-form-item label="简介" prop="detail">
        <a-input v-model="form.detail" type="textarea" />
      </a-form-item>
      <a-form-item label="企业LOGO" prop="logo">
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
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
        enterpriseCode: "",
        creditCode: "",
        contact: "",
        phone: "",
        detail: "",
        logo: ""
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
