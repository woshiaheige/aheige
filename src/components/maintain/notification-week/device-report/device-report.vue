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
        :data="chartDeviceData"
        :settings="chartSettings"
      ></ve-histogram>
      <a-divider dashed>故障详情</a-divider>
      <a-descriptions layout="vertical" bordered size="small">
        <a-descriptions-item
          :span="2"
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
                  <span slot="title">{{ item.deviceName }}</span>
                  <!-- <div slot="description">故障时间：{{ item.gmtEnd }}</div> -->
                </a-list-item-meta>
                <div>故障时间：{{ item.gmtEnd }}</div>
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
      axisSite: { right: ["故障率"] },
      yAxisName: ["设备数", "故障率"],
      stack: { 设备: ["设备正常", "设备故障"] }
    };
    return {
      notificationData: [
        {
          dateLabel: "星期一",
          taskList: [
            {
              deviceName: "设备A",
              gmtEnd: "2020-4-25 15:32:32"
            }
          ]
        }
      ],
      chartDeviceData: {
        columns: ["日期", "设备正常", "设备故障", "故障率"],
        rows: []
      }
    };
  },
  methods: {
    getTableData() {
      this.chartDeviceData.rows = [
        { 日期: "星期天", 设备正常: 3792, 设备故障: 3492, 故障率: 0.323 },
        { 日期: "星期一", 设备正常: 1393, 设备故障: 1093, 故障率: 0.32 },
        { 日期: "星期二", 设备正常: 3530, 设备故障: 3230, 故障率: 0.26 },
        { 日期: "星期三", 设备正常: 2923, 设备故障: 2623, 故障率: 0.76 },
        { 日期: "星期四", 设备正常: 1723, 设备故障: 1423, 故障率: 0.49 },
        { 日期: "星期五", 设备正常: 3792, 设备故障: 3492, 故障率: 0.323 },
        { 日期: "星期六", 设备正常: 4593, 设备故障: 4293, 故障率: 0.78 }
      ];
    }
  }
};
</script>
