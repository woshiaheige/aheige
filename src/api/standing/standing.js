import base from "../base";
import axios from "../axios";

const standing = {
  getCarList(data) {
    return axios.get(base.api + "standing/car", {
      params: data
    });
  }
};

export default standing;
