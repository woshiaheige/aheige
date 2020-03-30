<template>
  <a-layout>
    <a-layout-header>
      <div class="header-body">
        <div v-for="(item, index) of cardList" :key="index" class="Card-body">
          <a-card
            :class="[item.CardClass]"
            :title="item.header"
            :bordered="false"
          >
            <p>{{ item.content }}</p>
          </a-card>
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="35%">
        <div class="calendar-body">
          <a-card>
            <a-calendar :fullscreen="false" @panelChange="onPanelChange"
          /></a-card>
        </div>
        <div class="calendar-body">
          <a-card title="负责的站点(20个)">
            <p>务庄污水(污水)</p>
            <p>务庄污水(污水)</p>
            <p>务庄污水(污水)</p>
            <p>务庄污水(污水)</p>
            <p>务庄污水(污水)</p>
            <p>务庄污水(污水)</p>
          </a-card>
        </div>
      </a-layout-sider>
      <a-layout-content width="100%">
        <a-card title="待完成的任务"></a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import "@/assets/style/workbench/workbench.less";

export default {
  data() {
    return {
      cardList: [
        { header: "待完成任务", content: 5, CardClass: "unfinished" },
        { header: "今日计划任务", content: 3, CardClass: "today" },
        { header: "所有完成任务", content: 120, CardClass: "all" },
        { header: "待完成报告", content: 0, CardClass: "report" }
      ]
    };
  },
  mounted() {},
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    }
  }
};
</script>
