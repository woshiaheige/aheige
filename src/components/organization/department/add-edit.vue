<template>
  <a-modal
    :title="title + '部门'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="名称">
        <a-input
          placeholder="名称"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '输入名称' }] }
          ]"
        />
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
      title: "新建",
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
        if (this.obj.key == "edit") {
          this.title = "编辑";
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
