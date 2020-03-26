<template>
  <a-modal
    title="新增突发任务"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="选择站点">
        <a-select
          placeholder="站点"
          v-decorator="[
            'station',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        >
          <!-- <a-select-option value="1">1</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item label="选择任务项">
        <a-select
          placeholder="任务项"
          v-decorator="[
            'region',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="任务项名称">
        <a-input
          placeholder="任务项名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="开始时间">
        <a-date-picker
          v-model="form.beginTime"
          show-time
          type="date"
          placeholder="开始时间"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="结束时间">
        <a-date-picker
          v-model="form.endTime"
          show-time
          type="date"
          placeholder="结束时间"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="任务项说明">
        <a-input v-model="form.desc" type="textarea" />
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
      form: this.$form.createForm(this)
    };
  },
  computed: {
    status: {
      get() {
        return this.visible;
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
  mounted() {}
};
</script>
<style lang="less" scoped></style>
