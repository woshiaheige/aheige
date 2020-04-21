<template>
  <a-modal
    :title="carModal.type == 'out' ? '出库' : '入库'"
    v-model="carModal.show"
    @cancel="handleCancel"
  >
    <a-form
      :form="form"
      ref="ruleForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
      @submit="handleOk"
      v-if="carModal.show"
    >
      <a-form-item label="名称" prop="name">
        <a-select
          placeholder="选择名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入供应商名称' }] }
          ]"
        >
          <a-select-option value="1">试剂CH2O2</a-select-option>
          <a-select-option value="2">试剂SO2</a-select-option>
          <a-select-option value="3">中光</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="编号" prop="no">
        <a-input placeholder="输入编号" v-decorator="['no']" />
      </a-form-item>
      <a-form-item label="库存单位" prop="unit">
        <a-input placeholder="输入库存单位" v-decorator="['unit']" />
      </a-form-item>
      <a-form-item
        :label="carModal.type == 'enter' ? '入库数量' : '出库数量'"
        prop="num"
      >
        <a-input placeholder="输入入库数量" v-decorator="['num']" />
      </a-form-item>
      <a-form-item label="备注" prop="remark">
        <a-input
          placeholder="输入备注"
          type="textarea"
          v-decorator="['remark']"
        />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" html-type="submit" @click="handleOk">
        保存
      </a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  computed: {
    carModal() {
      return this.value;
    }
  },
  methods: {
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleCancel() {
      this.carModal.show = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
