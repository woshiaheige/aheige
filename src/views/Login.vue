<template>
  <div class="login">
    <div class="login-signup-header">
      <div class="slider-logo">
        <img :src="require('@/assets/img/logo.png')" alt="" />
      </div>
    </div>
    <div class="login-box">
      <div class="login-title">
        <a-icon
          type="arrow-left"
          id="toLogin"
          style="cursor: pointer"
          v-if="forgetFlag"
          v-margin:right="5"
        />{{ forgetFlag ? "找回密码" : "登录" }}
      </div>
      <div class="title-line"></div>
      <a-form-model
        ref="login"
        :model="formValidate"
        :rules="ruleValidate"
        v-if="!forgetFlag"
      >
        <a-form-model-item prop="user">
          <a-input
            v-model="formValidate.user"
            placeholder="手机/用户名"
            @pressEnter="handleSubmit('login')"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password
            v-model="formValidate.password"
            placeholder="密码"
            @pressEnter="handleSubmit('login')"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </a-form-model-item>
        <div class="link">
          <span id="forgetPass">忘记密码？</span>
        </div>
        <a-form-model-item>
          <a-button
            type="primary"
            class="login-button"
            @click="handleSubmit('login')"
            >登录</a-button
          >
        </a-form-model-item>
      </a-form-model>
      <a-form-model
        ref="login"
        :model="formValidate"
        :rules="ruleValidate"
        v-if="forgetFlag"
      >
        <a-form-model-item prop="user">
          <a-input
            v-model="formValidate.user"
            placeholder="请输入手机号"
            @pressEnter="handleSubmit('login')"
          >
            <a-icon type="tablet" slot="prefix" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="code">
          <a-input
            :maxlength="4"
            v-model="formValidate.code"
            placeholder="验证码"
            class="verify-code"
            @on-focus="onFocus('code')"
            @on-blur="onBlur('code')"
          >
            <a-icon type="barcode" slot="prefix" />
          </a-input>
          <a-button
            type="primary"
            class="verify-button"
            @click="getVerifyCode"
            :disabled="disable"
            >{{ buttonText }}</a-button
          >
        </a-form-model-item>
        <a-form-model-item class="login-button-form">
          <a-button
            type="primary"
            class="login-button"
            @click="handleSubmit('login')"
            :disabled="disable"
            >找回密码</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        user: "",
        password: ""
      },
      ruleValidate: {},
      disable: false,
      countdown: 60,
      forgetFlag: false
    };
  },

  computed: {
    buttonText() {
      if (this.disable) {
        return this.countdown + "s后重新发送";
      } else {
        return "发送验证码";
      }
    }
  },
  watch: {
    forgetFlag(newVal) {
      let that = this;
      if (newVal) {
        console.log(newVal);
        this.$nextTick(() => {
          document
            .getElementById("toLogin")
            .addEventListener("click", function() {
              console.log("click");
              that.forgetFlag = false;
            });
        });
      } else {
        console.log(newVal);
        this.$nextTick(() => {
          document
            .getElementById("forgetPass")
            .addEventListener("click", function() {
              console.log("click");
              that.forgetFlag = true;
            });
        });
      }
    }
  },
  mounted() {
    this.setForgetPassword();
  },
  methods: {
    handleSubmit(ref) {
      let that = this;
      if (
        this.formValidate.user.trim() == "" ||
        this.formValidate.password.trim() == ""
      ) {
        this.$message.warning("请输入正确的用户名或密码！");
      } else {
        this.$refs[ref].validate(valid => {
          if (valid) {
            let data = {
              username: that.formValidate.user,
              password: this.$md5(that.formValidate.password)
            };
            that.$api.login
              .login(data)
              .then(async res => {
                console.log(res);
                if (res.data.state == 0) {
                  that.$message.success("登录成功！");
                  sessionStorage.setItem("token", res.data.data.token);

                  await this.$api.login.getResource().then(async res => {
                    await that.$store.dispatch(
                      "createRouterTable",
                      res.data.data
                    );
                    // that.setLoading("正在登录中，请稍等");
                    that.$router.push("/");
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    },
    getVerifyCode() {
      let data = {
        phone: this.formValidate.user
      };
      let that = this;
      if (data.phone != "") {
        this.$api.common.getVerifyCode(data).then(res => {
          console.log(res);
          that.disable = true;

          let clock = window.setInterval(() => {
            that.countdown--;
            if (that.countdown < 0) {
              //当倒计时小于0时清除定时器
              window.clearInterval(clock);
              that.disable = false;
              that.countdown = 60;
            }
          }, 1000);
        });
      } else {
        this.$message.warning("请填写手机");
      }
    },
    setForgetPassword() {
      let that = this;

      document
        .getElementById("forgetPass")
        .addEventListener("click", function() {
          that.forgetFlag = true;
        });
    },
    onFocus(input) {
      console.log(input);
    },
    onBlur(input) {
      console.log(input);
    }
  }
};
</script>
