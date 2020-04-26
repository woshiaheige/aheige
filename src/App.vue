<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
export default {
  data() {
    return {
      zh_CN
    };
  },
  created() {
    this.refresh();
    this.removeLoading();
  },
  methods: {
    refresh() {
      if (sessionStorage.getItem("permission")) {
        //处理F5 刷新鉴权
        this.$store.dispatch(
          "createRouterTable",
          JSON.parse(sessionStorage.getItem("permission"))
        );
      }
    }
  }
};
</script>

<style lang="less">
body {
  background-color: #f7f7f7 !important;
}
</style>
