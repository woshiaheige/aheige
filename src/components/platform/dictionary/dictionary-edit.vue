<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :maskClosable="false"
  >
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
          :disabled="dictionaryId != ''"
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
            'value',
            { rules: [{ required: true, message: '输入字典值' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="字典说明">
        <a-input
          type="textarea"
          placeholder="字典说明"
          v-decorator="['remark']"
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
    dictionaryDetail: {
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      dictionaryId: ""
    };
  },
  computed: {
    title() {
      let title = this.dictionaryDetail ? "编辑字典" : "新建字典";
      return title;
    }
  },
  watch: {
    dictionaryDetail(nval) {
      if (nval) {
        this.dictionaryId = nval.id;
        setTimeout(() => {
          this.form.setFieldsValue({
            name: nval.name,
            code: nval.code,
            value: nval.value,
            remark: nval.remark
          });
        }, 50);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.dictionaryId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.dictionaryId) {
            this.editdictionary(values);
          } else {
            this.adddictionary(values);
          }
        }
      });
    },
    editdictionary(values) {
      let params = values;
      params.id = this.dictionaryId;
      this.$api.common.editSysDict(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改字典成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    adddictionary(values) {
      let params = values;
      this.$api.common.addSysDict(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建字典成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    }
  }
};
</script>
