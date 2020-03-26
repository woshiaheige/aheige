<template>
  <a-modal
    title="任务关闭"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="关闭类型">
        <a-select v-model="form.region" placeholder="关闭类型">
          <!-- <a-select-option value="1">1</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item label="关闭原因">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-item>
      <span v-margin:left="100">备注：关闭原因由移动端端现场填写</span>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        region: undefined,
        desc: ""
      }
    };
  },
  computed: {
    status: {
      get() {
        return this.visible;
      },
      set() {}
    }
  },
  methods: {
    handleOk() {
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("cancel", false);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
