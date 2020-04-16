<template>
  <a-modal
    :title="title + '权限'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <!-- <a-form-item label="部门">
        <a-select placeholder="部门"> </a-select>
      </a-form-item>
      <a-form-item label="权限编码">
        <a-input placeholder="权限编码" />
      </a-form-item> -->
      <a-form-item label="权限名称">
        <a-input placeholder="权限名称" />
      </a-form-item>
      <!-- <a-form-item label="状态">
        <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio :value="1">可用</a-radio>
          <a-radio :value="2">不可用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="权限授权">
        <a-select placeholder="权限授权"> </a-select>
      </a-form-item> -->
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
