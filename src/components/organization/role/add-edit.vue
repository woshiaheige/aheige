<template>
  <a-modal
    :title="title + '权限'"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="权限名称">
        <a-input
          placeholder="请选择"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请选择权限名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="权限类型">
        <a-radio-group
          name="radioGroup"
          placeholder="请选择"
          v-decorator="[
            'type',
            { rules: [{ required: true, message: '请选择权限类型' }] }
          ]"
        >
          <a-radio :value="1">可用</a-radio>
          <a-radio :value="2">不可用</a-radio>
        </a-radio-group>
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
      form: this.$form.createForm(this),
      roleId: ""
    };
  },
  computed: {
    visible() {
      return this.obj.show;
    }
  },

  watch: {
    obj(nval) {
      if (nval.detail) {
        this.title = "编辑";
        this.roleId = nval.detail.id;
        setTimeout(() => {
          this.form.setFieldsValue({
            name: nval.detail.name
          });
        }, 50);
      } else {
        this.title = "新建";
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    reset() {
      this.roleId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.roleId) {
            this.editRole(values);
          } else {
            this.addRole(values);
          }
        }
      });
    },
    editRole(values) {
      let params = values;
      params.id = this.roleId;
      this.$api.organization.editSysRole(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改权限成功");
          this.$emit("confirm");
          this.reset();
        }
      });
    },
    addRole(values) {
      let params = values;
      this.$api.organization.addSysRole(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建权限成功");
          this.$emit("confirm");
          this.reset();
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
