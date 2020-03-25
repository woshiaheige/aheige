<template>
  <a-modal title="基本信息" v-model="visible.show" @ok="handleOk" width="60%">
    <a-form>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="Prime between 8 & 12"
        :validate-status="number.validateStatus"
        :help="number.errorMsg"
      >
        <a-input-number :min="8" :max="12" :value="number.value" />
      </a-form-item>
    </a-form>
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
    handleOk() {}
  }
};
</script>

<style lang="less" scoped></style>
