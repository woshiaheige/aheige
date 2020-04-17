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
import customer from "./customer/customer";
import report from "./report/report";
import platform from "./platform/platform";
import login from "./login/login";
import car from "./car/car";
import monitor from "./monitor/monitor";
import organization from "./organization/organization";
import product from "./product/product";

// 导出接口
export default {
  base,
  common,
  approval,
  maintain,
  iMaintain,
  standing,
  customer,
  report,
  platform,
  login,
  car,
  monitor,
  organization,
  product
};
