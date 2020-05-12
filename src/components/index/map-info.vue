<template>
  <a-modal
    :title="title"
    :visible="modelData.show"
    @cancel="handleCancel"
    :mask="false"
    :footer="null"
  >
    <div v-margin:bottom="25">
      <div class="content-window ant-row">
        <div class="ant-col-12"><span>监控点名称：</span>{{ list.name }}</div>
        <div class="ant-col-12">
          <span>所属企业：</span>{{ list.enterpriseName }}
        </div>
        <div class="ant-col-12"><span>MN号码：</span>{{ list.mn }}</div>
        <div class="ant-col-12">
          <span>监测因子数：</span>{{ list.divisorCount }}
        </div>
        <div class="ant-col-12">
          <span>是否在线：</span>{{ list.state == 0 ? "在线" : "离线" }}
        </div>
        <div class="ant-col-12">
          <span>是否异常：</span>{{ list.isNormal == 0 ? "正常" : "异常" }}
        </div>
        <div class="ant-col-24">
          <span>最后通迅时间：</span>{{ list.communicationTime }}
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      title: "",
      list: {}
    };
  },
  computed: {
    modelData() {
      return this.value;
    }
  },
  methods: {
    handleCancel() {
      this.modelData.show = false;
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.title = this.value.data.name;
        this.list = this.value.data;
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
