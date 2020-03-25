<template>
  <a-modal title="基本信息" v-model="visible.show" @ok="handleOk" width="60%">
    <a-steps :current="1" v-margin:bottom="20">
      <a-step>
        <!-- <span slot="title">Finished</span> -->
        <template slot="title">
          发起审批
        </template>
        <span slot="description">2020.2.1</span>
      </a-step>
      <a-step title="审批中" description="2020.3.25" />
      <a-step title="审批完成" description="" />
    </a-steps>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">审批标题：</span>项目一</a-col
      >
      <a-col :span="12"><span class="descriptions">状态：</span>待审批</a-col>
    </a-row>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">创建时间：</span>2020.02.02</a-col
      >
      <a-col :span="12"><span class="descriptions">类型：</span>a</a-col>
    </a-row>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">审批内容：</span>项目一</a-col
      >
      <a-col :span="12"
        ><span class="descriptions">附件：</span><a>下载附件</a></a-col
      >
    </a-row>
    <div slot="footer">
      <a-button @click="cancel">取消</a-button>
      <a-button type="primary">通过</a-button>
      <a-button type="primary">拒绝</a-button>
      <a-button type="primary">转交</a-button>
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
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
      number: {
        value: 11
      }
    };
  },
  computed: {
    visible() {
      return this.value;
    }
  },
  methods: {
    handleOk() {},
    cancel() {
      this.visible.show = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
