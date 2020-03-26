<template>
  <a-card :bordered="false" class="station-detail">
    <span slot="title"><a-icon type="arrow-left" @click="reBack"/>站点管理</span>
    <a-tabs
      defaultActiveKey="baseData"
      @change="tabChange"
      :animated="false"
      size="small"
      type="card"
    >
      <a-tab-pane tab="站点基础数据" key="baseData">
        <station-base-data />
      </a-tab-pane>
      <a-tab-pane tab="站点扩展属性" key="extension" forceRender
        >Content of Tab Pane 2</a-tab-pane
      >
      <a-tab-pane tab="监控点信息" key="monitorPoint"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="监控点站房信息" key="monitorRoom"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="监控点网络信息" key="monitorNet"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="监控点排放口信息（气）" key="monitorGas"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="监控点排放口信息（水）" key="monitorWater"
        >Content of Tab Pane 3</a-tab-pane
      >
      <a-tab-pane tab="监控点设备（公告）" key="monitorCommon"
        >Content of Tab Pane 3</a-tab-pane
      >
    </a-tabs>
  </a-card>
</template>

<script>
import stationBaseData from "@/components/customer/station/station-base-data";
export default {
  components: {
    stationBaseData
  },
  data() {
    return {};
  },
  methods: {
    tabChange(e) {
      console.log(e);
    },
    reBack(){
      this.$router.replace({path:'/customer/station'})
    }
  }
};
</script>
