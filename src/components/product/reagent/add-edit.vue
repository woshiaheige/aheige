<template>
  <a-modal
    :title="modelData.type == 'add' ? '新建物品' : '编辑物品信息'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="编号" prop="number">
        <a-input placeholder="输入编号" v-model.trim="formData.number" />
      </a-form-model-item>
      <a-form-model-item label="名称" prop="name">
        <a-input placeholder="名称" v-model.trim="formData.name" />
      </a-form-model-item>
      <a-form-model-item label="品牌" prop="brand">
        <a-input placeholder="输入品牌" v-model.trim="formData.brand" />
      </a-form-model-item>
      <a-form-model-item label="型号" prop="model">
        <a-input placeholder="输入型号" v-model.trim="formData.model" />
      </a-form-model-item>
      
      <a-form-model-item label="库存单位" prop="unit">
        <a-input placeholder="输入库存单位" v-model.trim="formData.unit" />
      </a-form-model-item>
      <a-form-model-item label="库存警戒线" prop="cordon">
        <a-input placeholder="输入库存警戒线" v-model.trim="formData.cordon" />
      </a-form-model-item>
      <a-form-model-item label="参考价格" prop="price">
        <a-input placeholder="输入参考价格" v-model.trim="formData.price" />
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-input
          placeholder="输入说明"
          type="textarea"
          v-model="formData.remark"
        />
      </a-form-model-item>
    </a-form-model>
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
      formData: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        brand: [
          {
            required: true,
            message: "请输入品牌",
            trigger: "blur"
          }
        ],
        model: [
          {
            required: true,
            message: "请输入型号",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入编号",
            trigger: "blur"
          }
        ],
        unit: [
          {
            required: true,
            message: "请输入库存单位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    modelData: {
      get() {
        return this.value;
      },
      set() {}
    }
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
      });
      if (this.modelData.type == "edit") {
        this.$api.product.editGoods(this.formData).then(res => {
          if (res.data.state == 0) {
            this.$message.success("编辑成功");
            this.$emit("refresh");
            this.handleCancel();
          }
        });
      } else {
        this.$api.product.addGoods(this.formData).then(res => {
          if (res.data.state == 0) {
            this.$message.success("新建成功");
            this.$emit("refresh");
            this.handleCancel();
          }
        });
      }
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    getEditData() {
      this.$api.product
        .getGoodsById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            this.formData = res.data.data;
          }
        });
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
