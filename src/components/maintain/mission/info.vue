<template>
  <div>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
      <a-row>
        <a-col :span="12">
          <a-form-item label="任务名称">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="任务状态">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="任务站点">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="客户企业">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="运维小组">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="预定时间">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="开始时间">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="完成时间">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="任务说明">
            <a-input />
          </a-form-item>
        </a-col>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">
              接单
            </a-button>
            <a-button v-margin:left="8">拒绝</a-button>
            <a-button v-margin:left="8">转交</a-button>
          </a-col>
        </a-row>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
