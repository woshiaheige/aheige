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
        <a-tab-pane tab="设备周报" key="3"> <device-report /> </a-tab-pane>
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
import deviceReport from "./device-report/device-report"; //设备报表
export default {
  components: { dataReport, operationReport, deviceReport },
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
        // this.$nextTick(() => {
        //   this.$refs.exceed.getTableData(nval);
        //   this.$refs.unusual.getTableData(nval);
        // });

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
