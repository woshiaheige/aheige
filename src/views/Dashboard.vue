<template>
  <div class="dashboard">
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">最近访问</div>
      </div>
      <div class="history-list">
        <div
          class="history-item"
          v-for="item in historyList"
          :key="item.path"
          @click="toHistoryUrl(item.path)"
        >
          <a-avatar
            :size="64"
            :icon="item.icon"
            :style="'backgroundColor:' + item.bgcolor"
            v-margin:bottom="16"
          />
          <p class="title">{{ item.name }}</p>
        </div>
      </div>
      <a-empty v-if="!historyList.length" :image="simpleImage" />
    </a-card>
    <img :src="require('@/assets/img/index.png')" class="index-img" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyList: localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history")).reverse()
        : []
    };
  },
  methods: {
    toHistoryUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style></style>
