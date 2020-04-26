<template>
  <div>
    <a-card>
      <div class="card-header">
        <div class="title">设备报表</div>
      </div>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <span class="num">6</span>
          <p>设备数量</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#4caf50'">4</span>
          <p>正常运行</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#f44336'">2</span>
          <p>设备故障</p>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="89">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>设备故障率</p>
            </template>
          </a-progress>
        </a-col>
      </a-row>
      <a-divider dashed>故障统计</a-divider>
      <ve-histogram
        :data="chartMaintainData"
        :settings="chartSettings"
      ></ve-histogram>
      <a-divider dashed>故障详情</a-divider>
      <a-descriptions layout="vertical" bordered size="small">
        <a-descriptions-item
          :span="3"
          v-for="item in notificationData"
          :key="item.dateTime"
        >
          <template>
            <span slot="label">{{ item.dateLabel }}</span>
            <a-list
              itemLayout="horizontal"
              :dataSource="item.taskList"
              class="dispatch-list"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title"
                    >{{ item.handleName }}（{{ item.groupName }}）</span
                  >
                  <div slot="description">
                    <p>运维任务：{{ item.taskName }}</p>
                  </div>
                </a-list-item-meta>
                <div>{{ item.gmtEnd }}</div>
              </a-list-item>
            </a-list>
          </template>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      stack: { 任务: ["已完成", "未完成"] }
    };
    return {
      notificationData: [],
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
