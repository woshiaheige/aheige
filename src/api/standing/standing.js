import base from "../base";
import axios from "../axios";

const standing = {
  getCarList(data) {
    return axios.get(base.api + "standing/car", {
      params: data
    });
  },
  getSupplierList(data) {
    return axios.get(base.api + "standing/supplier", {
      params: data
    });
  }
};

export default standing;
