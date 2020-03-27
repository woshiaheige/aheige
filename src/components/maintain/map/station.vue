<template>
  <a-modal
    title="任务详细信息"
    v-model="status"
    @cancel="handleCancel"
    :width="900"
    class="maintain-modal"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>
    <div class="mission-detail">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1"> </a-tab-pane>
        <a-tab-pane tab="任务项" key="2"></a-tab-pane>
        <a-tab-pane tab="任务报告" key="3"> </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>
<script>
export default {
  components: {},
  props: {
    show: {
      required: true,
      type: Boolean
    },
    modal: Object
  },
  data() {
    return {};
  },
  computed: {
    status: {
      get() {
        return this.show;
      },
      set() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel", false);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
