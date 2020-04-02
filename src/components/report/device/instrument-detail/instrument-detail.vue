<template>
  <div class="instrument-detail">
    <a-tabs
      defaultActiveKey="baseData"
      @change="tabChange"
      :animated="false"
      size="small"
      type="card"
    >
      <a-tab-pane tab="仪器基础数据" key="baseData"> <base-data /> </a-tab-pane>
      <a-tab-pane tab="设备信息(数采仪)" key="instrumentFor"
        ><instrument-for
      /></a-tab-pane>
      <a-tab-pane tab="设备（xxx）" key="instrumentAudio"
        ><instrument-audio
      /></a-tab-pane>
      <a-tab-pane tab="设备信息(视频监控)" key="instrumentVideo"
        ><instrument-video
      /></a-tab-pane>
      <a-tab-pane tab="设备因子信息" key="instrumentFactor"
        ><instrument-factor
      /></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import baseData from "./basic-data";
import instrumentFor from "./instrument-for";
import instrumentAudio from "./instrument-audio";
import instrumentVideo from "./instrument-video";
import instrumentFactor from "./instrument-factor";
export default {
  components: {
    baseData,
    instrumentFor,
    instrumentAudio,
    instrumentVideo,
    instrumentFactor
  },
  data() {
    return {};
  },
  methods: {
    tabChange() {}
  }
};
</script>
