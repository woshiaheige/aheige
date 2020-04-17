/**
 * http配置
 */
import axios from "axios";
import router from "../router";

var instance = axios.create({
  timeout: 1000 * 30
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.request.use(
  config => {
    // let token = sessionStorage.getItem("token");
    let token = "8888";
    config.headers["token"] = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
      // if (response.data.state != 0) {
      //   return Promise.reject(response);
      // } else {
      //   return Promise.resolve(response);
      // }
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      if (error.response.status === 500) {
        return Promise.reject(error);
      } else if (error.status === 404 || error.response.status === 403) {
        router.push("/404");
      } else {
        return Promise.reject(error);
      }
    } else {
      if (error.status === 500) {
        return Promise.reject(error);
      } else if (error.status === 404 || error.status === 403) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
