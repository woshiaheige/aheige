<template>
  <div class="login" v-lazy:background-image="loginBg">
    <div class="login-box">
      <div class="left">
        <div v-margin:bottom="64" style="width:440px">
          <div class="welcome" v-margin:bottom="10">欢迎来到</div>
          <div class="title">
            <p v-margin:bottom="10">运维项目</p>
            <p>运维项目平台</p>
          </div>
        </div>

        <div class="login-img"></div>
      </div>
      <div class="right">
        <a-form-model :model="form" :rules="rules" ref="ruleForm">
          <a-form-model-item label="用户名" prop="username">
            <a-input v-model="form.username" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password v-model="form.password" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" block @click="onHandleSubmit">
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import loginBg from "@/assets/img/login_bg.png";
export default {
  data() {
    return {
      loginBg,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    onHandleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let data = {
            deadline: "",
            deptId: "",
            email: "",
            enterpriseId: "",
            gmtCreate: "",
            gmtModified: "",
            id: 0,
            isDeleted: 0,
            isLocked: 0,
            lastLoginTime: "",
            username: this.form.username,
            password: this.$md5(this.form.password),
            phone: "",
            salt: "",
            sex: "",
            type: 0,
            name: "",
            wechatId: ""
          };
          this.$api.login
            .login(data)
            .then(res => {
              if (res.data.state == 0) {
                sessionStorage.setItem("token", res.data.data.token);
                this.$message.success("登录成功！");
                this.$router.push("/");
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
