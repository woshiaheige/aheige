<template>
  <a-modal
    :visible="visible"
    title="修改密码"
    @ok="handleOk"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="旧密码" prop="oldPassword">
        <a-input-password
          placeholder="旧密码"
          :maxLength="30"
          v-model.trim="formData.oldPassword"
        />
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="newPassword">
        <a-input-password
          placeholder="新密码"
          :maxLength="30"
          v-model.trim="formData.newPassword"
        />
      </a-form-model-item>
      <a-form-model-item label="再次输入密码" prop="secondPwd">
        <a-input-password
          placeholder="再次输入密码"
          :maxLength="30"
          v-model.trim="formData.secondPwd"
        />
      </a-form-model-item>
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
    visible: {
      required: true,
      type: Boolean
    }
  },
  computed: {},
  data() {
    let that = this;
    const validatePwd = (rule, value, callback) => {
      if (value.trim() !== that.formData.newPassword.trim()) {
        callback("密码不一致！");
      } else {
        callback();
      }
    };
    return {
      formData: {},
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        secondPwd: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur"
          },
          { validator: validatePwd, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        let data = {
          oldPassword: this.$md5(this.formData.oldPassword),
          newPassword: this.$md5(this.formData.newPassword)
        };

        this.$api.login.changePsw(data).then(res => {
          if (res.data.state == 0) {
            this.$message.success("修改密码成功，请重新登录");
            this.handleCancel();
            setTimeout(() => {
              sessionStorage.removeItem("userinfo");
              this.$router.push("/login");
            }, 1000);
          }
        });
      });
    },
    handleCancel() {
      this.$emit("update:visible", false);
      this.$refs.ruleForm.resetFields();
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
