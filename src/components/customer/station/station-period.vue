<template>
  <a-modal :width="1000" title="新增站点暂停运营周期" :visible="visible" @cancel="closeModal">
    <a-form
      ref="formModal"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      
      <a-form-item label="开始时间" prop="startTime">
        <a-date-picker placeholder="选择开始时间" />
      </a-form-item>
      <a-form-item label="结束时间" prop="endTime">
        <a-date-picker placeholder="选择接受时间" />
      </a-form-item>
      <a-form-item label="暂停说明" prop="announce">
        <a-input v-model="form.announce" type="textarea" />
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
      loading:false,
      form: {
        startTime:"",
        endTime:"",
        announce:""
      },
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
