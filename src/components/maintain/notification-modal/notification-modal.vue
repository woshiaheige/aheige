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
        <div class="title" v-fontsize="28">
          {{ notification.type == "week" ? "第N期周报表" : "第N期月报表" }}
        </div>
        <div>
          报表周期：{{ $moment(notification.beginTime).format("YYYY-MM-DD") }} -
          {{ $moment(notification.endTime).format("YYYY-MM-DD") }}
        </div>
      </div>
      <a-tabs type="card" defaultActiveKey="1" @change="slectDetail">
        <a-tab-pane
          :tab="notification.type == 'week' ? '数据周报' : '数据月报'"
          key="1"
        >
          <data-report ref="dataReport"
        /></a-tab-pane>
        <a-tab-pane
          :tab="notification.type == 'week' ? '运维周报' : '运维月报'"
          key="2"
        >
          <operation-report ref="operationReport" />
        </a-tab-pane>
        <a-tab-pane
          :tab="notification.type == 'week' ? '设备周报' : '设备月报'"
          key="3"
        >
          <device-report ref="deviceReport" />
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
  data() {
    return {
      loading: false,
      notification: {}
    };
  },
  watch: {
    "obj.show"(nval) {
      if (nval) {
        this.$nextTick(() => {
          this.slectDetail(1);
        });
      }
    }
  },
  methods: {
    handleOk() {
      this.$emit("cancel");
    },
    handleCancel() {
      this.$emit("cancel");
    },

    setNotification() {
      this.notification = this.$bus.$data.notification;
    },
    slectDetail(e) {
      if (e == 1) {
        this.$refs.dataReport.getTableData();
        // console.log(this.$refs.dataReport);
      } else if (e == 2) {
        this.$nextTick(() => {
          this.$refs.operationReport.getTableData();
        });
      } else if (e == 3) {
        this.$nextTick(() => {
          this.$refs.deviceReport.getTableData();
        });
      }
    }
  },
  mounted() {}
};
</script>

<style></style>
