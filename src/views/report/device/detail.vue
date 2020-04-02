<template>
  <a-card :bordered="false" class="device-detail">
    <span slot="title"
      ><a-icon type="arrow-left" @click="reBack" />仪器汇总</span
    >
    <a-tabs
      defaultActiveKey="instrumentDetail"
      @change="tabChange"
      :animated="false"
      size="small"
    >
      <a-tab-pane tab="仪器详情" key="instrumentDetail">
        <instrument-detail />
      </a-tab-pane>
      <a-tab-pane tab="运维任务项" key="maintainMission"
        >Content of Tab Pane 2</a-tab-pane
      >
      <a-tab-pane tab="仪器报表" key="instrumentReport"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="使用备件" key="replacement"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="使用药剂" key="medicament"
        >Content of Tab Pane 3</a-tab-pane
      >
    </a-tabs>
  </a-card>
</template>

<script>
import instrumentDetail from "@/components/report/device/instrument-detail/instrument-detail";
export default {
  components: { instrumentDetail },
  data() {
    return {};
  },
  methods: {
    tabChange(e) {
      console.log(e);
    },
    reBack() {
      this.$router.replace({ path: "/report/device" });
    }
  }
};
</script>
