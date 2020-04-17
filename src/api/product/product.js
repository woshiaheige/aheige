import base from "../base";
import axios from "../axios";

const product = {
  getSupplierList(data) {
    return axios.get(base.api + "supplier/", {
      params: data
    });
  },
  postAddSupplier(data) {
    return axios.post(base.api + "supplier/addSupplier", data);
  }
};

export default product;
