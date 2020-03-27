<template>
  <a-modal
    title="添加新的企业"
    :visible="visible"
    @cancel="closeModal"
    @ok="submit"
  >
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="客户企业名称">
        <a-input
          placeholder="请输入企业名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入企业名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="组织企业代码证">
        <a-input v-decorator="['enterpriseCode']" />
      </a-form-item>
      <a-form-item label="统一社会信用代码">
        <a-input v-decorator="['creditCode']" />
      </a-form-item>
      <a-form-item label="联系人">
        <a-input v-decorator="['contact']" />
      </a-form-item>
      <a-form-item label="企业电话号码">
        <a-input v-decorator="['phone']" />
      </a-form-item>
      <a-form-item label="简介">
        <a-input v-decorator="['intro']" type="textarea" />
      </a-form-item>
      <a-form-item label="企业LOGO">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="logo.url" :src="logo.url" alt="avatar" />
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
      form: this.$form.createForm(this, { name: "enterpriseNew" }),
      logo: {
        url: "",
        id: ""
      },
      rules: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.form.resetFields();
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
