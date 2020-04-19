<template>
  <a-modal
    title="新建违章"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="车牌">
        <a-input
          placeholder="车牌"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="违章时间">
        <a-date-picker
          show-time
          type="date"
          placeholder="违章时间"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="违章地点">
        <a-input placeholder="违章地点" />
      </a-form-item>
      <a-form-item label="违章行为">
        <a-input placeholder="违章行为" />
      </a-form-item>
      <a-form-item label="扣分">
        <a-input placeholder="扣分" />
      </a-form-item>
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
      form: this.$form.createForm(this)
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
