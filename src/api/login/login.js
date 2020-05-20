import base from "../base";
import axios from "../axios";

const login = {
  login(data) {
    return axios.post(base.api + "login/", data);
  },
  //获取权限
  getResource() {
    return axios.get(base.api + "sysResource/queryUserResource");
  },
  //获取验证码
  getVerifyCode(data) {
    return axios.get(
      base.api + "verification/getRetrievePasswordVerificationCode",
      { params: data }
    );
  },
  //检查验证码
  checkVerifyCode(data) {
    return axios.get(base.api + "verification/checkVerificationCode", {
      params: data
    });
  },
  //修改密码
  updatePassword(data) {
    return axios.get(base.api + "sysUser/updateUserPassword", {
      params: data
    });
  }
};

export default login;
