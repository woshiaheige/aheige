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
    return axios.get(base.api + "assetGoods/deleteAssetGoods", {
      params: data
    });
  },
  getGoodsById(data) {
    return axios.get(base.api + "assetGoods/getAssetGoodsById", {
      params: data
    });
  },
  getGoodsSelect(data) {
    return axios.get(base.api + "assetGoods/query", {
      params: data
    });
  },
  //获库存列表
  getStockList(data) {
    return axios.get(base.api + "assetStock/", {
      params: data
    });
  },
  addStock(data) {
    return axios.post(base.api + "assetStock/addAssetStock", data);
  },
  delStock(data) {
    return axios.get(base.api + "assetStock/deleteAssetStock", {
      params: data
    });
  },
  getStockById(data) {
    return axios.get(base.api + "assetStock/getAssetStockById", {
      params: data
    });
  }
};

export default product;
