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
              v-if="loginStatus === 'resetCode' || loginStatus === 'resetPwd'"
              v-margin:right="5"
              @click="rebackLogin"
            />{{ loginTitle }}
          </div>
          <!-- <div class="title-line"></div> -->
          <a-form-model
            ref="login"
            :model="formValidate"
            :rules="ruleValidate"
            v-if="loginStatus == 'login'"
          >
            <a-form-model-item prop="user">
              <a-input
                v-model="formValidate.user"
                placeholder="账号/手机号码"
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
              <span id="forgetPass" @click="loginStatus = 'resetCode'"
                >忘记密码？</span
              >
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
            ref="resetCode"
            :model="formValidate"
            :rules="ruleValidate"
            v-if="loginStatus == 'resetCode'"
          >
            <a-form-model-item prop="user">
              <a-input
                v-model="formValidate.phone"
                placeholder="请输入手机号"
                @pressEnter="handleSubmit('login')"
              >
                <a-icon type="tablet" slot="prefix" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="code">
              <a-input
                :maxLength="6"
                v-model="formValidate.code"
                placeholder="验证码"
                class="verify-code"
                v-width="128"
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
              <a-button type="primary" class="login-button" @click="checkCode"
                >找回密码</a-button
              >
            </a-form-model-item>
          </a-form-model>
          <!-- 重设密码 -->
          <a-form-model
            ref="resetPwd"
            :model="formValidate"
            :rules="ruleValidate"
            v-if="loginStatus == 'resetPwd'"
          >
            <a-form-model-item prop="resetPwdFirst">
              <a-input-password
                v-model="formValidate.resetPwdFirst"
                placeholder="密码"
                @pressEnter="handleSubmit('login')"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item prop="resetPwdSecond">
              <a-input-password
                v-model="formValidate.resetPwdSecond"
                placeholder="再次输入密码"
                @pressEnter="handleSubmit('login')"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item class="login-button-form">
              <a-button
                type="primary"
                @click="resetPassword()"
                class="login-button"
                v-preventReClick
                >确认</a-button
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
        password: "",
        phone: "",
        code: "",
        resetPwdFirst: "",
        resetPwdSecond: ""
      },
      ruleValidate: {},
      disable: false,
      countdown: 60,
      forgetFlag: false,
      loginStatus: "login"
    };
  },
  computed: {
    buttonText() {
      if (this.disable) {
        return this.countdown + "s后重新发送";
      } else {
        return "发送验证码";
      }
    },
    loginTitle() {
      if (this.loginStatus === "login") {
        return "登录";
      } else if (this.loginStatus === "resetCode") {
        return "忘记密码";
      } else {
        return "修改密码";
      }
    }
  },
  mounted() {},
  methods: {
    resetPassword() {
      //显示重设密码弹窗
      if (
        this.formValidate.resetPwdFirst.trim() !== "" &&
        this.formValidate.resetPwdSecond.trim() !== ""
      ) {
        if (
          this.formValidate.resetPwdFirst.trim() !==
          this.formValidate.resetPwdSecond.trim()
        ) {
          this.$message.warning("密码不一致！");
        } else {
          let data = {
            password: this.$md5(this.formValidate.resetPwdFirst),
            phone: this.formValidate.phone
          };
          this.$api.login.updatePassword(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("修改密码成功");
              this.loginStatus = "login";
            }
          });
        }
      } else {
        this.$message.warning("请输入密码！");
      }
    },
    checkCode() {
      if (
        this.formValidate.phone.trim() !== "" &&
        this.formValidate.code.trim() !== ""
      ) {
        let data = {
          phone: this.formValidate.phone,
          verifyCode: this.formValidate.code
        };
        this.$api.login
          .checkVerifyCode(data)
          .then(async res => {
            if (res.data.state == 0) {
              console.log(res);
              this.loginStatus = "resetPwd";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.warning("请输入手机和验证码！");
      }
    },
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
        phone: this.formValidate.phone
      };
      let that = this;

      if (this.formValidate.phone.trim() !== "") {
        this.$api.login.getVerifyCode(data).then(res => {
          if (res.data.state == 0) {
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
          }
        });
      } else {
        this.$message.warning("请填写手机");
      }
    },
    rebackLogin() {
      this.loginStatus = "login";
      this.formValidate = this.$options.data().formValidate;
    }
  }
};
</script>
