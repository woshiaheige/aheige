<template>
  <a-modal
    :title="title + '因子'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="因子">
        <a-select
          placeholder="因子"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '请选择因子' }] }
          ]"
        ></a-select>
      </a-form-item>
      <a-form-item label="上限">
        <a-input placeholder="上限" />
      </a-form-item>
      <a-form-item label="下限">
        <a-input placeholder="下限" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      title: "新增",
      form: this.$form.createForm(this)
    };
  },
  computed: {
    status: {
      get() {
        return this.obj.show;
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
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        if (this.obj.row != "" && this.obj.row != undefined) {
          this.title = "编辑";
        } else {
          this.title = "新增";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
