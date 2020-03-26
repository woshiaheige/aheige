<template>
  <a-modal
    title="申请延期"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="延期时间">
        <a-date-picker
          v-model="form.time"
          placeholder="时间"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="延期原因">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-item>
      <span v-margin:left="100">备注：延期原因由移动端端现场填写</span>
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
        time: undefined,
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
