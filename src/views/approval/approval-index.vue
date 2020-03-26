<template>
  <a-card :bordered="false" class="index">
    <a-tabs @change="callback" type="card">
      <a-tab-pane tab="等待我审批" key="1">
        <wait-approval></wait-approval>
      </a-tab-pane>
      <a-tab-pane tab="我参与的审批" key="2">
        <approval-participate></approval-participate>
      </a-tab-pane>
      <a-tab-pane tab="我发起的审批" key="3">
        <start-approval></start-approval>
      </a-tab-pane>
      <a-tab-pane tab="发起审批" key="4">
        <to-start></to-start>
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
    return {};
  },
  mounted() {},
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>
