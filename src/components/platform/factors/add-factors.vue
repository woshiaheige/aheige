<template>
  <div>
    <a-modal
      title="新增"
      :visible="visible"
      @ok="handleOk"
      okText="确定"
      @cancel="handleCancel"
    >
      <a-form-model
        layout="inline"
        :model="form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 7 }"
      >
        <a-form-model-item label="污染物名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="污染物名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="污染物名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="污染物名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="污染物名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="污染物名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: ""
      }
    };
  },
  methods: {
    handleOk() {
      this.$emit("cancel");
      console.log("handleOk");
    },
    handleCancel() {
      console.log("handleCancel");
      this.$emit("cancel");
    }
  }
};
</script>

<style></style>
