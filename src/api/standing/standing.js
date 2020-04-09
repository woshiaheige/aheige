import base from "../base";
import axios from "../axios";

const standing = {
  getCarList(data) {
    return axios.get(base.mock + "standing/car", {
      params: data
    });
  },
  getSupplierList(data) {
    return axios.get(base.mock + "standing/supplier", {
      params: data
    });
  },
  getProductList(data) {
    return axios.get(base.mock + "standing/product", {
      params: data
    });
  }
};

export default standing;
