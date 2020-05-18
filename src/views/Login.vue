<template>
  <div class="login">
    <div class="login-header">
      <div class="banner">
        <div class="logo">
          <icon-font
            type="iconweibiaoti-1"
            style="color:#31a2f2;font-size:80px"
          ></icon-font>
        </div>
        <div class="logo-text">博控智维云</div>
      </div>
    </div>
    <div class="login-content">
      <div class="banner">
        <img
          :src="require('@/assets/img/login_bg.png')"
          v-height="335"
          class="login-img"
        />
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
          <!-- <div class="title-line"></div> -->
          <a-form-model
            ref="login"
            :model="formValidate"
            :rules="ruleValidate"
            v-if="!forgetFlag"
          >
            <a-form-model-item prop="user">
              <a-input
                v-model="formValidate.user"
                placeholder="用户名"
                @pressEnter="handleSubmit('login')"
                @on-focus="onFocus('username')"
                @on-blur="onBlur('username')"
              >
                <a-icon slot="prefix" type="user" id="username" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input-password
                v-model="formValidate.password"
                placeholder="密码"
                @pressEnter="handleSubmit('login')"
                @on-focus="onFocus('password')"
                @on-blur="onBlur('password')"
              >
                <a-icon slot="prefix" type="lock" id="password" />
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
                v-preventReClick
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
                v-width="128"
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
                v-height="41"
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
    </div>
    <div class="login-footer">
      <div class="banner">
        <a-row>
          <a-col :span="12">
            <a-card :bordered="false" v-margin:top="16">
              <div class="card-header">
                <div class="title">微信小程序</div>
              </div>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-card>
                    <img
                      alt="example"
                      style="width: 100%; height: 100%"
                      :src="require('@/assets/img/wx-app-qrcode.png')"
                    />
                    <template slot="actions" class="ant-card-actions">
                      <span>运维人员</span>
                    </template>
                  </a-card>
                </a-col>
                <a-col :span="12">
                  <a-card>
                    <img
                      alt="example"
                      style="width: 100%; height: 100%"
                      :src="
                        require('@/assets/img/wx-app-enterprise-qrcode.png')
                      "
                    />
                    <template slot="actions" class="ant-card-actions">
                      <span>企业用户</span>
                    </template>
                  </a-card>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card :bordered="false" v-margin:top="16">
              <div class="card-header">
                <div class="title">微信公众号</div>
              </div>
              <a-card>
                <a-list item-layout="vertical" size="large">
                  <a-list-item>
                    <img
                      slot="extra"
                      width="172"
                      :src="require('@/assets/img/official_account_qrcode.png')"
                    />
                    即刻关注博控智维云微信公众号，可实时获取包括数据报警，任务通知，
                    审批通知，报表推送等信息提醒
                  </a-list-item>
                </a-list>
              </a-card>
            </a-card>
          </a-col>
        </a-row>
        <span class="copyright"
          >Copyright © 2003-2020 Bocon. All Rights Reserved.</span
        >
      </div>
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
                if (res.data.state == 0) {
                  sessionStorage.setItem(
                    "userinfo",
                    JSON.stringify(res.data.data)
                  );

                  await this.$api.login.getResource().then(async res => {
                    if (res.data.state == 0) {
                      if (res.data.data) {
                        that.$message.success("登录成功！");
                        await that.$store.dispatch(
                          "createRouterTable",
                          res.data.data
                        );
                        that.setLoading();
                        that.$router.push("/");
                      } else {
                        that.$message.warning("此用户暂无权限");
                      }
                    }
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
      document.getElementById(input).style.color = "#0970BB";
    },
    onBlur(input) {
      document.getElementById(input).style.color = "#808695";
    }
  }
};
</script>
