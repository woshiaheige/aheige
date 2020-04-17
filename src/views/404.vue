<template>
  <a-result status="404" title="404" subTitle="对不起，页面不存在">
    <template v-slot:extra>
      <a-button type="primary" @click="$router.push('/index')"
        >返回主页</a-button
      >
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
