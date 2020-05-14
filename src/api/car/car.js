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
  },
  //查询所有车辆
  getAllCar(data) {
    return axios.get(base.api + "assetVehicle/query", {
      params: data
    });
  },
  //新增油费
  addAssetVehicleCost(data) {
    return axios.post(base.api + "assetFuelCost/addAssetVehicleCost", data);
  },
  //修改油费
  editAssetVehicleCost(data) {
    return axios.post(base.api + "assetFuelCost/editAssetVehicleCost", data);
  },
  //删除油费
  deleteAssetVehicleCost(data) {
    return axios.get(base.api + "assetFuelCost/deleteAssetVehicleCost", {
      params: data
    });
  },

  //新增过路费
  addTollCost(data) {
    return axios.post(base.api + "assetTollsCost/addAssetVehicleCost", data);
  },
  //修改过路费
  editTollCost(data) {
    return axios.post(base.api + "assetTollsCost/editAssetVehicleCost", data);
  },
  //删除过路费
  deleteTollCost(data) {
    return axios.get(base.api + "assetTollsCost/deleteAssetVehicleCost", {
      params: data
    });
  },

  //新增保险费
  addInsurancCost(data) {
    return axios.post(
      base.api + "assetInsuranceCost/addAssetVehicleCost",
      data
    );
  },
  //修改保险费
  editInsurancCost(data) {
    return axios.post(
      base.api + "assetInsuranceCost/editAssetVehicleCost",
      data
    );
  },

  //加油费
  assetFuelCost(data) {
    return axios.get(base.api + "assetFuelCost/", {
      params: data
    });
  },
  //过路费
  assetTollsCost(data) {
    return axios.get(base.api + "assetTollsCost/", {
      params: data
    });
  },
  //保险费
  assetInsuranceCost(data) {
    return axios.get(base.api + "assetInsuranceCost/", {
      params: data
    });
  },
  //维修保养
  assetMaintenanceCost(data) {
    return axios.get(base.api + "assetMaintenanceCost/", {
      params: data
    });
  },
  //新增维修保养
  addAssetMaintenanceCost(data) {
    return axios.post(
      base.api + "assetMaintenanceCost/addAssetVehicleCost",
      data
    );
  },
  //修改维修保养
  editAssetMaintenanceCost(data) {
    return axios.post(
      base.api + "assetMaintenanceCost/editAssetVehicleCost",
      data
    );
  },
  //删除维修保养
  deleteAssetMaintenanceCost(data) {
    return axios.get(base.api + "assetMaintenanceCost/deleteAssetVehicleCost", {
      params: data
    });
  },
  //年检
  assetAifCost(data) {
    return axios.get(base.api + "assetAifCost/", {
      params: data
    });
  },
  //新增年检
  addAssetAifCost(data) {
    return axios.post(base.api + "assetAifCost/addAssetVehicleCost", data);
  },
  //修改年检
  editAssetAifCost(data) {
    return axios.post(base.api + "assetAifCost/editAssetVehicleCost", data);
  },
  //删除年检
  deleteAssetAifCost(data) {
    return axios.get(base.api + "assetAifCost/deleteAssetVehicleCost", {
      params: data
    });
  },
  //车辆统计列表
  assetVehicleTotalCost(data) {
    return axios.get(base.api + "assetVehicleCost/", {
      params: data
    });
  },
  //统计分析
  countVehicleCost(data) {
    return axios.get(base.api + "assetVehicleCost/countVehicleCost", {
      params: data
    });
  },
  //趋势分析
  analysisVehicleCost(data) {
    return axios.get(base.api + "assetVehicleCost/analysisVehicleCost", {
      params: data
    });
  }
};

export default car;
