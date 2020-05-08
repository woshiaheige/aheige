/**
 * http配置
 */
import axios from "axios";
import router from "../router";
import { message } from "ant-design-vue";
import qs from "qs";

var instance = axios.create({
  timeout: 1000 * 30
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.request.use(
  config => {
    if (JSON.parse(sessionStorage.getItem("userinfo"))) {
      let token = JSON.parse(sessionStorage.getItem("userinfo")).token;
      config.headers["token"] = token;
    }
    if (config.method === "get") {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.state && response.data.state != 0) {
        message.destroy();
        message.warning(response.data.msg);

        if (response.data.state === 4) {
          router.push("/login");
          sessionStorage.clear();
          location.reload();
        }
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      if (error.response.status === 500) {
        message.destroy();
        message.error("请连接网络");
        return Promise.reject(error);
      } else if (error.status === 404 || error.response.status === 403) {
        router.push("/404");
      } else {
        message.destroy();
        message.error("请连接网络");
        return Promise.reject(error);
      }
    } else {
      if (error.status === 500) {
        message.destroy();
        message.error("请连接网络");
        return Promise.reject(error);
      } else if (error.status === 404 || error.status === 403) {
        router.push("/404");
        return Promise.reject(error);
      } else {
        message.destroy();
        message.error("请连接网络");
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
