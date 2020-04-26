<template>
  <div>
    <a-card>
      <div class="card-header">
        <div class="title">数据报表</div>
      </div>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <span class="num" v-color="'#f44336'">13</span>
          <p>超标次数</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#ff9800'">21</span>
          <p>异常次数</p>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="31">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>分钟数据完整率</p>
            </template>
          </a-progress>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="45">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>小时数据完整率</p>
            </template>
          </a-progress>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="78">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>日数据完整率</p>
            </template>
          </a-progress>
        </a-col>
      </a-row>
      <a-divider dashed>数据统计</a-divider>
      <ve-histogram :data="chartMonitorData"></ve-histogram>
      <a-divider dashed>数据详情</a-divider>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="超标详情" key="1">
          <detail-exceed :formInline="obj" ref="exceed" />
        </a-tab-pane>
        <a-tab-pane tab="异常详情" key="2" forceRender>
          <detail-unusual :formInline="obj" ref="unusual" />
        </a-tab-pane>
        <a-tab-pane tab="数据完整率" key="3">
          <detail-integrity />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import detailExceed from "./detail/detail-exceed";
import detailUnusual from "./detail/detail-unusual.vue";
import detailIntegrity from "./detail/detail-integrity.vue";
export default {
  components: { detailExceed, detailUnusual, detailIntegrity },
  data() {
    return {
      obj: {},
      chartMonitorData: {
        columns: ["日期", "超标次数", "异常次数"],
        rows: [
          { 日期: "1", 超标次数: 13, 异常次数: 10 },
          { 日期: "2", 超标次数: 35, 异常次数: 32 },
          { 日期: "3", 超标次数: 29, 异常次数: 26 },
          { 日期: "4", 超标次数: 17, 异常次数: 14 },
          { 日期: "5", 超标次数: 37, 异常次数: 34 },
          { 日期: "6", 超标次数: 45, 异常次数: 42 }
        ]
      }
    };
  }
};
</script>
