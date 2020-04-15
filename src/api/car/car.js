import base from "../base";
import axios from "../axios";

const car = {
  //车辆管理列表
  getCarList(data) {
    return axios.get(base.api + "assetVehicle/", {
      params: data
    });
  },
  //新增车辆
  addAssetVehicle(data) {
    return axios.post(base.api + "assetVehicle/addAssetVehicle", data);
  },
  //获取车辆详情
  getAssetVehicleById(data) {
    return axios.get(base.api + "assetVehicle/getAssetVehicleById", {
      params: data
    });
  }
};

export default car;
