<template>
  <a-modal
    :title="carModal.type == 'add' ? '新增供应商信息' : '编辑供应商信息'"
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
      <a-form-item label="供应商名称" prop="name">
        <a-input
          placeholder="输入供应商名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入供应商名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="供应商地址" prop="address">
        <a-input placeholder="输入供应商地址" v-decorator="['address']" />
      </a-form-item>
      <a-form-item label="联系人" prop="linkman">
        <a-input placeholder="输入联系人" v-decorator="['linkman']" />
      </a-form-item>
      <a-form-item label="联系电话" prop="tel">
        <a-input placeholder="输入联系电话" v-decorator="['tel']" />
      </a-form-item>
      <a-form-item label="说明" prop="explain">
        <a-input
          placeholder="输入说明"
          type="textarea"
          v-decorator="['explain']"
        />
      </a-form-item>
      <a-form-item label="供应商等级" prop="rete">
        <a-select placeholder="选择供应商等级" v-decorator="['rete']">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
          <a-select-option value="4">4</a-select-option>
          <a-select-option value="5">5</a-select-option>
        </a-select>
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
