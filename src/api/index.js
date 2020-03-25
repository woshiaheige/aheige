/**
 * api接口的统一出口
 */
//接口地址
import base from "./base";
//公用
import common from "./common";
import approval from "./approval";
import maintain from "./maintain";

// 导出接口
export default {
  base,
  common,
  approval,
  maintain
};
