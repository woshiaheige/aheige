import base from "../base";
import axios from "../axios";

const organization = {
  //获取用户
  sysUser(data) {
    return axios.get(base.api + "sysUser/", {
      params: data
    });
  },
  //锁定用户
  lockedUser(data) {
    return axios.get(base.api + "sysUser/lockedUser", {
      params: data
    });
  },
  //激活角色
  unlockedUser(data) {
    return axios.get(base.api + "sysUser/unlockedUser", {
      params: data
    });
  },

  //获取角色
  sysRole(data) {
    return axios.get(base.api + "sysRole/", {
      params: data
    });
  },
  //新增权限
  addSysRole(data) {
    return axios.post(base.api + "sysRole/addSysRole", data);
  },
  //修改权限
  editSysRole(data) {
    return axios.post(base.api + "sysRole/editSysRole", data);
  },
  //删除权限
  deleteSysRole(data) {
    return axios.get(base.api + "sysRole/deleteSysRole", {
      params: data
    });
  },

  //权限详情
  getSysRoleById(data) {
    return axios.get(base.api + "sysRole/getSysRoleById", {
      params: data
    });
  },
  //获取权限资源
  getSysResourceById(data) {
    return axios.get(base.api + "sysResource/getSysResourceById", {
      params: data
    });
  },

  //权限树
  queryResourceTree(data) {
    return axios.get(base.api + "sysResource/queryResourceTree", {
      params: data
    });
  },

  //小组列表
  sysGroup(data) {
    return axios.get(base.api + "sysGroup/", {
      params: data
    });
  },
  //获取小组详情
  getSysGroupById(data) {
    return axios.get(base.api + "sysGroup/getSysGroupById", {
      params: data
    });
  },
  //新建小组
  addSysGroup(data) {
    return axios.post(base.api + "sysGroup/addSysGroup", data);
  },
  //修改小组
  editSysGroup(data) {
    return axios.post(base.api + "sysGroup/editSysGroup", data);
  },
  //删除小组
  deleteSysGroup(data) {
    return axios.get(base.api + "sysGroup/deleteSysGroup", { params: data });
  }
};

export default organization;
