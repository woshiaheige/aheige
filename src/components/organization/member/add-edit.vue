<template>
  <a-modal
    :title="title + '员工'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="姓名">
        <a-input
          placeholder="姓名"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '输入姓名' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="账号">
        <a-input
          placeholder="账号"
          v-decorator="[
            'account',
            { rules: [{ required: true, message: '输入账号' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="员工手机">
        <a-input
          placeholder="员工手机"
          v-decorator="[
            'phone',
            { rules: [{ required: true, message: '输入员工手机' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="微信ID">
        <a-input placeholder="输入微信ID" v-decorator="['wechat']" />
      </a-form-item>
      <a-form-item label="是否运维人员">
        <a-radio-group
          @change="onOperationChange"
          :defaultValue="2"
          :options="operationOptions"
        />
      </a-form-item>
      <a-form-item label="运维小组" v-if="operation == 1">
        <a-select placeholder="选择运维小组"> </a-select>
      </a-form-item>
      <a-form-item label="是否审核人员">
        <a-radio-group
          @change="onAuditorChange"
          :defaultValue="2"
          :options="auditorOptions"
        />
      </a-form-item>
      <a-form-item label="审核权限" v-if="auditor == 1">
        <a-select placeholder="选择审核权限"> </a-select>
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
      operationOptions: [
        { label: "是", value: 1 },
        { label: "否", value: 2 }
      ],
      operation: "",
      auditorOptions: [
        { label: "是", value: 1 },
        { label: "否", value: 2 }
      ],
      auditor: "",
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
    },
    onOperationChange(val) {
      this.operation = val.target.value;
    },
    onAuditorChange(val) {
      this.auditor = val.target.value;
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
