<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="小组名称">
        <a-input
          placeholder="小组名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '输入小组名称' }] }
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
    groupName: {
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
      if (this.groupName) {
        return "编辑小组";
      } else {
        return "新增小组";
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
