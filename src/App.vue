<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view></router-view>
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
    this.removeLoading();
  },
  methods: {}
};
</script>

<style lang="less">
body {
  background-color: #f7f7f7 !important;
}
</style>
