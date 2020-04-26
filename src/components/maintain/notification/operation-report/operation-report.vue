<template>
  <div>
    <a-card>
      <div class="card-header">
        <div class="title">运维报表</div>
      </div>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <span class="num">6</span>
          <p>运维任务</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#4caf50'">4</span>
          <p>已完成</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#f44336'">2</span>
          <p>未完成</p>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="89">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>任务完成率</p>
            </template>
          </a-progress>
        </a-col>
      </a-row>
      <a-divider dashed />
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <a-statistic title="日常巡检" :value="2" />
        </a-col>
        <a-col :span="4">
          <a-statistic title="设备校准" :value="4" />
        </a-col>
        <a-col :span="4">
          <a-statistic title="标气更换" :value="2" />
        </a-col>
      </a-row>
      <a-divider dashed>运维统计</a-divider>
      <ve-histogram
        :data="chartMaintainData"
        :settings="chartSettings"
      ></ve-histogram>
      <a-divider dashed>运维详情</a-divider>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="已完成任务" key="1">
          <mission-finished />
        </a-tab-pane>
        <a-tab-pane tab="未完成任务" key="2" forceRender>
          <mission-unfinished />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import missionFinished from "./detail/mission-finished";
import missionUnfinished from "./detail/mission-unfinished";
export default {
  components: { missionFinished, missionUnfinished },
  data() {
    this.chartSettings = {
      stack: { 任务: ["已完成", "未完成"] }
    };
    return {
      chartMaintainData: {
        columns: ["日期", "已完成", "未完成", "完成率"],
        rows: [
          { 日期: "1", 已完成: 1393, 未完成: 1093, 完成率: 0.32 },
          { 日期: "2", 已完成: 3530, 未完成: 3230, 完成率: 0.26 },
          { 日期: "3", 已完成: 2923, 未完成: 2623, 完成率: 0.76 },
          { 日期: "4", 已完成: 1723, 未完成: 1423, 完成率: 0.49 },
          { 日期: "5", 已完成: 3792, 未完成: 3492, 完成率: 0.323 },
          { 日期: "6", 已完成: 4593, 未完成: 4293, 完成率: 0.78 }
        ]
      }
    };
  }
};
</script>
