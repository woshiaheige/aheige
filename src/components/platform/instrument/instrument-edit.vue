<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="仪器名称">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入仪器名称' }] }
          ]"
          placeholder="请输入仪器名称"
        />
      </a-form-item>
      <a-form-item label="编码">
        <a-input
          v-decorator="[
            'sortnum',
            { rules: [{ required: true, message: '请输入品牌型号' }] }
          ]"
          placeholder="请输入品牌型号"
        />
      </a-form-item>
      <a-form-item label="关联因子">
        <a-select placeholder="请输入默认使用小组" v-decorator="['group']">
          <a-select-option value="1">
            Option 1
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- <a-form-item label="默认仪器名称">
        <a-input v-decorator="['nickName']" placeholder="请输入默认仪器名称" />
      </a-form-item> -->
      <a-form-item label="规格参数">
        <a-input v-decorator="['parameter']" placeholder="请输入规格参数" />
      </a-form-item>
      <a-form-item label="生产厂商">
        <a-input v-decorator="['factory']" placeholder="请输入生产厂商" />
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
    instruementId: {
      //详情id
      required: false,
      default: "",
      type: String || Number
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "InspectionEdit" }),
      rules: {}
    };
  },
  computed: {
    title() {
      return this.instruementId ? "修改仪器型号信息" : "添加新的仪器";
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
