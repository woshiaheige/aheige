import base from "../base";
import axios from "../axios";

const car = {
  //车辆管理列表
  getCarList(data) {
    return axios.get(base.api + "assetVehicle/", {
      params: data
    });
  },
  //新建车辆
  addAssetVehicle(data) {
    return axios.post(base.api + "assetVehicle/addAssetVehicle", data);
  },
  //修改车辆
  editAssetVehicle(data) {
    return axios.post(base.api + "assetVehicle/editAssetVehicle", data);
  },
  //获取车辆详情
  getAssetVehicleById(data) {
    return axios.get(base.api + "assetVehicle/getAssetVehicleById", {
      params: data
    });
  },
  //删除车辆
  deleteAssetVehicle(data) {
    return axios.get(base.api + "assetVehicle/deleteAssetVehicle", {
      params: data
    });
  },
  //车辆使用列表
  manageVehicleUse(data) {
    return axios.get(base.api + "manageVehicleUse/", {
      params: data
    });
  },
  //车辆行驶路径
  trajectory(data) {
    return axios.get(base.api + "manageVehicleUse/trajectory", {
      params: data
    });
  }
};

export default car;
