<template>
  <a-modal
    :title="title + '员工'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="企业名称">
        <a-input placeholder="企业名称" disabled />
      </a-form-item>
      <a-form-item label="姓名">
        <a-input
          placeholder="姓名"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '输入员工姓名' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="账号">
        <a-input placeholder="账号" :disabled="isEdit" />
      </a-form-item>
      <a-form-item label="手机">
        <a-input
          placeholder="手机"
          v-decorator="['title', { rules: [{ message: '输入员工手机' }] }]"
        />
      </a-form-item>
      <a-form-item label="密码">
        <a-input placeholder="密码" type="password" />
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
      form: this.$form.createForm(this),
      isEdit: false
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
        this.isEdit = false;
        if (this.obj.row != "" && this.obj.row != undefined) {
          this.title = "编辑";
          this.isEdit = true;
        } else {
          this.title = "新增";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
