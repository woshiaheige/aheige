<template>
  <a-modal title="新增巡检" :visible="visible" @cancel="closeModal">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="报告名称">
        <a-input v-decorator="['name']" />
      </a-form-item>
      <a-form-item label="巡检开始时间">
        <a-date-picker
          style="width:100%"
          placeholder="选择巡检开始时间"
          v-decorator="['startTime']"
        />
      </a-form-item>
      <a-form-item label="巡检结束时间">
        <a-date-picker
          style="width:100%"
          placeholder="选择巡检结束时间"
          v-decorator="['endTime']"
        />
      </a-form-item>
      <a-form-item label="巡检人">
        <a-input v-decorator="['person']" />
      </a-form-item>
      <a-form-item label="巡检状态">
        <a-switch
          v-decorator="['switch', { valuePropName: 'checked' }]"
          checkedChildren="可用"
          unCheckedChildren="停用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "InspectionEdit" }),
      rules: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
