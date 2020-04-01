/**
 * api接口的统一出口
 */
//接口地址
import base from "./base";
//公用
import common from "./common";
import approval from "./approval/approval";
import maintain from "./maintain/maintain";
import iMaintain from "./i-maintain/i-maintain";
import standing from "./standing/standing";

// 导出接口
export default {
  base,
  common,
  approval,
  maintain,
  iMaintain,
  standing
};
