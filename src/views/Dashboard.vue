<template>
  <div class="dashboard">
    <a-card :bordered="false">
      <a-list item-layout="horizontal">
        <a-list-item>
          <a-list-item-meta description="上次登录时间：2020-5-30 16:30:00">
            <a slot="title" style="font-size: 18px; font-weight: 400"
              >{{ username }}, {{ welcomeLine }}~</a
            >
            <a-avatar
              :size="48"
              slot="avatar"
              :src="require('@/assets/img/people.png')"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
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
      username: sessionStorage.getItem("userinfo")
        ? JSON.parse(sessionStorage.getItem("userinfo")).username
        : "智维云用户",
      historyList: localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history")).reverse()
        : []
    };
  },
  computed: {
    welcomeLine() {
      if (this.$moment().hour() >= 6 && this.$moment().hour() < 12) {
        return "早上好";
      } else if (this.$moment().hour() >= 12 && this.$moment().hour() < 18) {
        return "下午好";
      } else if (this.$moment().hour() >= 18 && this.$moment().hour() < 24) {
        return "晚上好";
      } else {
        return "很晚了，快休息吧！";
      }
    }
  },
  methods: {
    toHistoryUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style></style>
