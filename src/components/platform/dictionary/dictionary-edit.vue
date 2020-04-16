<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="字典名称">
        <a-input
          placeholder="字典名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '输入字典名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="字典编号">
        <a-input
          placeholder="字典编号"
          v-decorator="[
            'code',
            { rules: [{ required: true, message: '输入字典编号' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="字典值">
        <a-input
          placeholder="字典值"
          v-decorator="[
            'val',
            { rules: [{ required: true, message: '输入字典值' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="字典说明">
        <a-input
          type="textarea"
          placeholder="字典说明"
          v-decorator="['desc']"
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
      form: this.$form.createForm(this)
    };
  },
  computed: {
    title() {
      let title = this.industryDetail ? "编辑字典" : "新增字典";
      return title;
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
