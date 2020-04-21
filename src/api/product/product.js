import base from "../base";
import axios from "../axios";

const product = {
  //获取供应商列表
  getSupplierList(data) {
    return axios.get(base.api + "supplier/", {
      params: data
    });
  },
  //新增供应商
  postAddSupplier(data) {
    return axios.post(base.api + "supplier/addSupplier", data);
  },
  //删除供应商
  delSupplier(data) {
    return axios.get(base.api + "supplier/deleteSupplier", {
      params: data
    });
  },
  //修改供应商
  postEditSupplier(data) {
    return axios.post(base.api + "supplier/editSupplier", data);
  },
  //通过id查询供应商
  getSupplierById(data) {
    return axios.get(base.api + "supplier/getSupplierById", {
      params: data
    });
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
