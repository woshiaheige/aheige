<template>
  <a-modal
    :title="modelData.type == 'add' ? '新建物资' : '编辑物资信息'"
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
        <a-input
          :maxLength="30"
          placeholder="编号"
          v-model.trim="formData.number"
        />
      </a-form-model-item>
      <a-form-model-item label="名称" prop="name">
        <a-input
          :maxLength="30"
          placeholder="名称"
          v-model.trim="formData.name"
        />
      </a-form-model-item>
      <a-form-model-item label="品牌" prop="brand">
        <a-input
          :maxLength="30"
          placeholder="品牌"
          v-model.trim="formData.brand"
        />
      </a-form-model-item>
      <a-form-model-item label="型号" prop="model">
        <a-input
          :maxLength="30"
          placeholder="型号"
          v-model.trim="formData.model"
        />
      </a-form-model-item>

      <a-form-model-item label="库存单位" prop="unit">
        <a-input
          :maxLength="30"
          placeholder="库存单位"
          v-model.trim="formData.unit"
        />
      </a-form-model-item>
      <a-form-model-item label="库存警戒线" prop="cordon">
        <a-input-number
          placeholder="库存警戒线"
          v-model.trim="formData.cordon"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="参考价格" prop="price">
        <a-input-number
          placeholder="参考价格"
          v-model="formData.price"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-input
          :maxLength="300"
          placeholder="说明"
          type="textarea"
          v-model="formData.remark"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
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
    const validNum = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      if (!/^[1-9]\d*$/.test(value)) {
        callback("请输入正整数");
      } else if (value > 99999999) {
        callback("最多只能输入8位数");
      } else {
        callback();
      }
    };
    const validPrice = (rule, value, callback) => {
      if (!value) {
        callback();
      }
      if (value < 0) {
        callback("请输入正数");
      } else if (value > 99999999) {
        callback("最多只能输入8位数");
      } else {
        callback();
      }
    };
    return {
      formData: {
        number: "",
        name: "",
        brand: "",
        model: "",
        unit: "",
        cordon: "",
        price: "",
        remark: ""
      },
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
        ],
        cordon: [{ validator: validNum, trigger: "blur" }],
        price: [
          {
            required: true,
            message: "请输入参考价格",
            trigger: "blur"
          },
          { validator: validPrice, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    modelData() {
      return this.value;
    }
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }

        if (this.modelData.type == "edit") {
          this.$api.product
            .editGoods(this.formData)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("编辑成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        } else {
          this.$api.product
            .addGoods(this.formData)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("新建成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
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
