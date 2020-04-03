<template>
  <a-modal
    :title="carModal.type == 'add' ? '新增物品' : '编辑物品信息'"
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
        <a-input
          placeholder="输入名称"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入名称' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="编号" prop="coding">
        <a-input placeholder="输入编号" v-decorator="['coding']" />
      </a-form-item>
      <a-form-item label="库存单位" prop="unit">
        <a-input placeholder="输入库存单位" v-decorator="['unit']" />
      </a-form-item>
      <a-form-item label="库存警戒线" prop="inventory">
        <a-input placeholder="输入库存警戒线" v-decorator="['inventory']" />
      </a-form-item>
      <a-form-item label="参考价格" prop="price">
        <a-input placeholder="输入参考价格" v-decorator="['price']" />
      </a-form-item>
      <a-form-item label="说明" prop="explain">
        <a-input
          placeholder="输入说明"
          type="textarea"
          v-decorator="['explain']"
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
