<template>
  <a-modal
    :title="title + '分类'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="600"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="分类名称">
        <a-input
          placeholder="分类名称"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="分类排序">
        <a-input placeholder="分类排序" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  components: {},
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
