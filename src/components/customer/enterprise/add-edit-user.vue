<template>
  <a-modal
    :title="title + '员工'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="姓名" prop="name">
        <a-input placeholder="请输入" :maxLength="20" v-model="formData.name" />
      </a-form-model-item>
      <a-form-model-item label="账号" prop="username">
        <a-input
          placeholder="请输入"
          v-model="formData.username"
          :disabled="isEdit"
          :maxLength="20"
        />
      </a-form-model-item>
      <a-form-model-item label="手机" prop="phone">
        <a-input placeholder="手机" v-model="formData.phone" />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password" has-feedback>
        <a-input-password
          placeholder="请输入"
          type="password"
          :maxLength="20"
          :visibilityToggle="false"
          v-model="formData.password"
          v-if="!passwordShow"
          v-focus="focusSyncOne"
          @change="passwordInput"
          @focus="removePassword"
          @blur="addPassword"
        />
        <a-input
          placeholder="请输入"
          v-model="formData.password"
          v-if="passwordShow"
          v-focus="focusSyncTwo"
        />
      </a-form-model-item>
      <!-- <a-form-model-item label="微信ID" prop="wxId">
        <a-input placeholder="请输入" :maxLength="30" v-model="formData.wxId" />
      </a-form-model-item> -->
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
      </a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value == undefined || value == "") {
        //非必须输入
        callback();
        return;
      }
      if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
        callback("电话号格式不正确");
      } else {
        callback();
      }
    };
    return {
      title: "新建",
      formData: {},
      rules: {
        name: [{ required: true, message: "输入员工姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "输入手机号码", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        username: [{ required: true, message: "输入账号", trigger: "blur" }],
        password: [{ required: true, message: "输入密码", trigger: "blur" }]
      },
      isEdit: false,
      oldPassword: "",
      passwordShow: false,
      focusSyncOne: false,
      focusSyncTwo: false,
      removeFlag: true
    };
  },
  computed: {
    modelData() {
      return this.value;
    }
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        if (this.modelData.type == "edit") {
          if (this.oldPassword != this.formData.password) {
            this.formData.password = this.$md5(this.formData.password);
          }
          this.$api.customer
            .editEnterprise(this.formData)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("编辑成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        } else {
          this.formData.enterpriseId = this.$route.query.id;
          this.formData.isBinding = 0;
          this.formData.password = this.$md5(this.formData.password);
          this.$api.customer
            .addEnterprise(this.formData)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("新建成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.removeFlag = true;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    getEditData() {
      this.$api.customer
        .getEnterpriseById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            this.formData = res.data.data;
            this.oldPassword = res.data.data.password;
          }
        });
    },
    passwordInput() {
      this.passwordShow = true;
      this.focusSyncTwo = true;
      this.removeFlag = false;
      setTimeout(() => {
        this.passwordShow = false;
        this.focusSyncOne = true;
      }, 500);
    },
    removePassword() {
      if (this.removeFlag) {
        if (this.modelData.type == "edit") {
          this.formData.password = "";
        }
      }
    },
    addPassword() {
      if (this.removeFlag) {
        if (this.modelData.type == "edit") {
          this.formData.password = this.oldPassword;
        }
      }
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.formData = {};
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
