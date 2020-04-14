<template>
  <a-card :bordered="false" class="approval" title="审批管理">
    <a-tabs @change="callback" type="card" v-model="tabSelected">
      <a-tab-pane tab="等待我审批" key="wait">
        <wait-approval v-model="tabSelected"></wait-approval>
      </a-tab-pane>
      <a-tab-pane tab="我参与的审批" key="participate">
        <approval-participate v-model="tabSelected"></approval-participate>
      </a-tab-pane>
      <a-tab-pane tab="我发起的审批" key="start">
        <start-approval v-model="tabSelected"></start-approval>
      </a-tab-pane>
      <a-tab-pane tab="发起审批" key="tostart">
        <to-start v-model="tabSelected"></to-start>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
import WaitApproval from "@/components/approval/wait-approval";
import ApprovalParticipate from "@/components/approval/approval-participate";
import StartApproval from "@/components/approval/start-approval";
import ToStart from "@/components/approval/to-start";
export default {
  components: { WaitApproval, ApprovalParticipate, StartApproval, ToStart },
  data() {
    return {
      tabSelected: ""
    };
  },
  mounted() {
    this.tabSelected = this.$route.query.activeKey
      ? this.$route.query.activeKey
      : "wait";
  },
  methods: {
    callback(key) {
      this.tabSelected = key;
      this.$router.push({ query: { activeKey: key } });
    }
  }
};
</script>
<style lang="less" scoped></style>
