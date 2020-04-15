<template>
  <a-modal
    :title="title + '监测点'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="所属企业">
        <a-select
          placeholder="所属企业"
          v-decorator="['title', { rules: [{ required: true }] }]"
        ></a-select>
      </a-form-item>
      <a-form-item label="监测点名称">
        <a-input
          placeholder="监测点名称"
          v-decorator="['title', { rules: [{ required: true }] }]"
        />
      </a-form-item>
      <a-form-item label="MN号码">
        <a-input
          placeholder="MN号码"
          v-decorator="['title', { rules: [{ required: true }] }]"
        />
      </a-form-item>
      <a-form-item label="监测点地图">
        <a-input placeholder="监测点地图" />
      </a-form-item>
      <a-form-item label="监测点类型">
        <a-select placeholder="监测点类型">
          <a-select-option value="1">废水</a-select-option>
          <a-select-option value="2">废气</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="传输类型">
        <a-select placeholder="传输类型">
          <a-select-option value="1">有线传输</a-select-option>
          <a-select-option value="2">无线传输</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="传输协议">
        <a-select placeholder="传输协议">
          <a-select-option value="1">HJ212-2005</a-select-option>
          <a-select-option value="2">HJ212-2017</a-select-option>
        </a-select>
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
