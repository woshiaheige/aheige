import base from "../base";
import axios from "../axios";

const organization = {
  //获取用户
  sysUser(data) {
    return axios.get(base.api + "sysUser/", {
      params: data
    });
  },
  //获取角色
  sysRole(data) {
    return axios.get(base.api + "sysRole/", {
      params: data
    });
  },
  //新增角色
  addSysRole(data) {
    return axios.post(base.api + "sysRole/addSysRole", data);
  },
  //修改角色
  editSysRole(data) {
    return axios.post(base.api + "sysRole/editSysRole", data);
  },
  //删除角色
  deleteSysRole(data) {
    return axios.get(base.api + "sysRole/deleteSysRole", {
      params: data
    });
  },

  //角色详情
  getSysRoleById(data) {
    return axios.get(base.api + "sysRole/getSysRoleById", {
      params: data
    });
  }
};

export default organization;
