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
      stack: { 设备: ["正常运行", "设备故障"] }
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
      chartMaintainData: {
        columns: ["日期", "正常运行", "设备故障", "故障率"],
        rows: [
          {
            日期: 1,
            正常运行: 6,
            设备故障: 0,
            故障率: 0
          },
          {
            日期: 2,
            正常运行: 6,
            设备故障: 0,
            故障率: 0
          },
          {
            日期: 3,
            正常运行: 6,
            设备故障: 0,
            故障率: 0
          },
          {
            日期: 4,
            正常运行: 4,
            设备故障: 2,
            故障率: 0.89
          },
          {
            日期: 5,
            正常运行: 4,
            设备故障: 2,
            故障率: 0.89
          },
          {
            日期: 6,
            正常运行: 4,
            设备故障: 2,
            故障率: 0.89
          }
        ]
      }
    };
  }
};
</script>
