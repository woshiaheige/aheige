<template>
  <a-modal
    :title="title + '投诉上报'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="上报人">
        <a-input placeholder="上报人" />
      </a-form-item>
      <a-form-item label="联系方式">
        <a-input placeholder="联系方式" />
      </a-form-item>
      <a-form-item label="上报来源">
        <a-select placeholder="上报来源">
          <!-- <a-select-option value="1">1</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item label="上报客户">
        <a-input placeholder="上报客户" />
      </a-form-item>
      <a-form-item label="上报状态" v-if="title == '编辑'">
        <a-select placeholder="上报状态"> </a-select>
      </a-form-item>
      <a-form-item label="针对小组">
        <a-input placeholder="针对小组" />
      </a-form-item>
      <a-form-item label="任务项说明">
        <a-input type="textarea" />
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
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
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
