<template>
  <a-modal
    :title="title + '供应商信息'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form
      :form="form"
      ref="ruleForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="供应商名称" prop="name">
        <a-input
          placeholder="供应商名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入供应商名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="所属区域" prop="address">
        <a-select placeholder="所属区域"></a-select>
      </a-form-item>
      <a-form-item label="地址" prop="address">
        <a-input placeholder="地址" />
      </a-form-item>
      <a-form-item label="联系人" prop="linkman">
        <a-input placeholder="联系人" />
      </a-form-item>
      <a-form-item label="联系电话" prop="tel">
        <a-input placeholder="联系电话" />
      </a-form-item>
      <a-form-item label="评级" prop="rete">
        <a-select placeholder="评级">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
          <a-select-option value="4">4</a-select-option>
          <a-select-option value="5">5</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  props: {
    obj: {
      type: Object
    }
  },
  data() {
    return {
      title: "",
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
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
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
