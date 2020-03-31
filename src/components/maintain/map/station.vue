<template>
  <a-modal
    title="任务详细信息"
    v-model="status"
    @cancel="handleCancel"
    class="content-window"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>
    <div class="mission-detail">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="站点信息" key="1"> </a-tab-pane>
        <a-tab-pane tab="任务信息" key="2">
          <ul>
            <li>监测中心 2020-3-16</li>
            <li>监测中心 2020-3-15</li>
            <li>监测中心 2020-3-14</li>
            <li>监测中心 2020-3-13</li>
            <li>监测中心 2020-3-12</li>
            <li>监测中心 2020-3-11</li>
          </ul>
        </a-tab-pane>
        <a-tab-pane tab="实时数据" key="3"> </a-tab-pane>
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
