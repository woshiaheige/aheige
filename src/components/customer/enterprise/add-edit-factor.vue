<template>
  <a-modal
    :title="title + '因子'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="因子" prop="divisorId">
        <a-select
          v-model="formData.divisorId"
          placeholder="因子"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in factorOptions"
            :key="item.id"
            :value="item.id"
            :filterOption="filterOptions"
          >
            <span v-if="item.protocolType == 0">
              {{ item.name }} / {{ item.code }} / 扩展协议
            </span>
            <span v-else
              >{{ item.name }} / {{ item.code }} /
              {{ item.protocolType }}协议</span
            >
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="下限" prop="floorval">
        <a-input type="number" v-model="formData.floorval" placeholder="下限" />
      </a-form-model-item>
      <a-form-model-item label="上限" prop="ceilval">
        <a-input type="number" v-model="formData.ceilval" placeholder="上限" />
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
    factorOptions: Array,
    value: Object
  },
  data() {
    let that = this;
    const validateNum = (rule, value, callback) => {
      console.log(value, that.formData.floorval);
      if (
        value &&
        that.formData.floorval &&
        Number(value) < Number(that.formData.floorval)
      ) {
        callback("上限值必须大于下限值");
      } else {
        callback();
      }
    };
    return {
      title: "添加",
      formData: {
        pointId: this.$route.query.id
      },
      rules: {
        divisorId: [
          {
            required: true,
            message: "请选择因子",
            trigger: "change"
          }
        ],
        floorval: [
          {
            required: true,
            message: "请输入下限",
            trigger: "blur"
          }
        ],
        ceilval: [
          {
            required: true,
            message: "请输入上限",
            trigger: "blur"
          },
          { validator: validateNum, trigger: "blur" }
        ]
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        );
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
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        if (this.modelData.type == "edit") {
          this.$api.customer.editFactor(this.formData).then(res => {
            if (res.data.state == 0) {
              that.$message.success("编辑成功");
              that.$emit("refresh");
              that.handleCancel();
            }
          });
        } else {
          this.$api.customer.addFactor(this.formData).then(res => {
            if (res.data.state == 0) {
              that.$message.success("新建成功");
              that.$emit("refresh");
              that.handleCancel();
            }
          });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    getEditData() {
      this.$api.customer
        .getFactorById({ id: this.modelData.row.id })
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
        this.formData = {
          pointId: this.$route.query.id
        };
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "添加";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
