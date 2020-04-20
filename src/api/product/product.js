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
  },
  //获取试剂管理列表
  getGoodsList(data) {
    return axios.get(base.api + "assetGoods/", {
      params: data
    });
  },
  addGoods(data) {
    return axios.post(base.api + "assetGoods/addAssetGoods", data);
  },
  editGoods(data) {
    return axios.post(base.api + "assetGoods/editAssetGoods", data);
  },

  delGoods(data) {
    return axios({
      url: base.api + "assetGoods/deleteAssetGoods",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      transformRequest: [
        data => {
          let params = "";
          for (var index in data) {
            params += index + "=" + data[index] + "&";
          }
          return params;
        }
      ]
    });
  },
  getGoodsById(data) {
    return axios.get(base.api + "assetGoods/getAssetGoodsById", {
      params: data
    });
  }
};

export default product;
