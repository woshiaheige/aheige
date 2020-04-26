<template>
  <div>
    <a-modal
      :bodyStyle="{ maxHeight: '700px', overflow: 'auto' }"
      :visible="visible"
      :title="notification.title"
      :width="900"
      @cancel="handleCancel"
    >
      <div class="card-header">
        <div class="title" v-fontsize="28">第N期周报表</div>
        <div>
          报表周期：{{ $moment(notification.beginTime).format("YYYY-MM-DD") }} -
          {{ $moment(notification.endTime).format("YYYY-MM-DD") }}
        </div>
      </div>
      <a-tabs type="card">
        <a-tab-pane tab="数据周报" key="1"> <data-report /></a-tab-pane>
        <a-tab-pane tab="运维周报" key="2">
          <operation-report />
        </a-tab-pane>
        <a-tab-pane tab="设备周报" key="3">
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
        </a-tab-pane>
      </a-tabs>

      <template slot="footer">
        <a-button key="back" @click="handleCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import dataReport from "./data-report/data-report"; //数据报表
import operationReport from "./operation-report/operation-report"; //运维报表
export default {
  components: { dataReport, operationReport },
  props: {
    obj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    visible() {
      return this.obj.show;
    }
  },
  watch: {
    obj(nval) {
      if (nval.show) {
        this.notification = nval;
        this.$nextTick(() => {
          this.$refs.exceed.getTableData(nval);
          this.$refs.unusual.getTableData(nval);
        });
        this.getReportPushDetails();
        this.getReportPushDataRateDetails();
      }
    }
  },
  data() {
    return {
      loading: false,
      formInline: { mn: "", beginTime: "", endTime: "" },
      notification: {
        pointId: "",
        beginTime: "",
        endTime: "",
        title: ""
      },
      notificationData: [],

      chartDeviceData: {
        columns: ["日期", "设备正常", "设备故障", "故障率"],
        rows: [
          { 日期: "1", 设备正常: 1393, 设备故障: 1093, 故障率: 0.32 },
          { 日期: "2", 设备正常: 3530, 设备故障: 3230, 故障率: 0.26 },
          { 日期: "3", 设备正常: 2923, 设备故障: 2623, 故障率: 0.76 },
          { 日期: "4", 设备正常: 1723, 设备故障: 1423, 故障率: 0.49 },
          { 日期: "5", 设备正常: 3792, 设备故障: 3492, 故障率: 0.323 },
          { 日期: "6", 设备正常: 4593, 设备故障: 4293, 故障率: 0.78 }
        ]
      }
    };
  },
  methods: {
    handleOk() {
      this.$emit("cancel");
    },
    handleCancel() {
      this.$emit("cancel");
    },
    getReportPushDetails() {
      //报表详情
      this.$api.maintain
        .getReportPushDetails({ reportPushId: this.notification.id })
        .then(res => {
          if (res.data.state == 0) {
            this.notificationData = this.detailFilter(res.data.data);
          }
        });
    },
    detailFilter(data) {
      //过滤和整理日期
      let list = [
        { dateLabel: "星期一", week: 1, taskList: [] },
        { dateLabel: "星期二", week: 2, taskList: [] },
        { dateLabel: "星期三", week: 3, taskList: [] },
        { dateLabel: "星期四", week: 4, taskList: [] },
        { dateLabel: "星期五", week: 5, taskList: [] },
        { dateLabel: "星期六", week: 6, taskList: [] },
        { dateLabel: "星期天", week: 0, taskList: [] }
      ];
      data.forEach(item => {
        list.forEach(list => {
          if (this.$moment(item.gmtEnd).day() == list.week) {
            list.taskList.push(item);
          }
        });
      });
      list = list.filter(item => {
        return item.taskList.length != 0;
      });
      return list;
    },
    getReportPushDataRateDetails() {
      let params = {
        beginTime: this.notification.beginTime,
        endTime: this.notification.endTime,
        pointId: this.notification.pointId
      };
      this.$api.maintain.getReportPushDataRateDetails(params).then(res => {
        if (res.data.state == 0) {
          this.tableData = res.data.data;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style></style>
