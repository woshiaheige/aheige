<template>
  <a-modal
    :title="carModal.type == 'add' ? '新增车辆信息' : '编辑车辆信息'"
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
      <a-form-item label="车牌" prop="name">
        <a-input
          placeholder="输入车牌"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入车牌' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="品牌型号" prop="brand">
        <a-input placeholder="输入品牌型号" v-decorator="['brand']" />
      </a-form-item>
      <a-form-item label="默认使用小组" prop="group">
        <a-select placeholder="选择默认使用小组" v-decorator="['group']">
          <a-select-option value="1">A小组</a-select-option>
          <a-select-option value="2">B小组</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="购置时间" prop="buy">
        <a-date-picker placeholder="选择购置时间" v-decorator="['buy']" />
      </a-form-item>
      <a-form-item label="上次年检时间" prop="inspection">
        <a-date-picker
          placeholder="选择上次年检时间"
          v-decorator="['inspection']"
        />
      </a-form-item>
      <a-form-item prop="type" label="可用状态">
        <a-radio-group
          v-decorator="[
            'status',
            { rules: [{ required: true, message: '请选择可用状态' }] }
          ]"
        >
          <a-radio :value="1">可用</a-radio>
          <a-radio :value="2">停用</a-radio>
        </a-radio-group>
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
