<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="行业名称">
        <a-input
          placeholder="行业名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '输入行业名称' }] }
          ]"
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
    },
    industryDetail: {
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  computed: {
    title() {
      let title = this.industryDetail ? "编辑行业" : "新增行业";
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
