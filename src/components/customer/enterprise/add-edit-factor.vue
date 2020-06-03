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
          @change="handleChange"
        >
          <a-select-option
            v-for="item in factorOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }} / {{ item.code }} /
            {{ item.protocolType == "0" ? "扩展" : item.protocolType }}协议
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="是否判定超标">
        <a-radio-group v-model="isTrue">
          <a-radio :value="1">
            是
          </a-radio>
          <a-radio :value="2">
            否
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="下限" prop="floorval">
        <a-input-number
          v-model="formData.floorval"
          placeholder="下限"
          @change="changeFloor"
          v-width="350"
          :disabled="isTrue == 2"
        />
      </a-form-model-item>
      <a-form-model-item label="上限" prop="ceilval">
        <a-input-number
          v-model="formData.ceilval"
          placeholder="上限"
          @change="changeCeil"
          v-width="350"
          :disabled="isTrue == 2"
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
    value: Object
  },
  data() {
    let that = this;
    const validateNum = (rule, value, callback) => {
      value = that.formData.ceilval;

      if (value == 0 && that.formData.floorval == 0 && that.isTrue == 1) {
        callback("上、下限值不能同时为0");
      } else if (
        Number(value) <= Number(that.formData.floorval) &&
        that.isTrue == 1
      ) {
        callback("上限值必须大于下限值");
      } else {
        callback();
      }
    };
    return {
      title: "添加",
      isTrue: 1,
      factorOptions: [],
      formData: {
        pointId: this.$route.query.id,
        floorval: "",
        ceilval: "",
        divisorId: undefined
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
          this.$api.customer
            .editFactor(this.formData)
            .then(res => {
              if (res.data.state == 0) {
                that.$message.success("编辑成功");
                that.$emit("refresh");
                that.handleCancel();
              }
            })
            .catch(() => {
              that.handleCancel();
            });
        } else {
          this.$api.customer
            .addFactor(this.formData)
            .then(res => {
              if (res.data.state == 0) {
                that.$message.success("新建成功");
                that.$emit("refresh");
                that.handleCancel();
              }
            })
            .catch(() => {
              that.handleCancel();
            });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.isTrue = 1;
      this.$refs.ruleForm.resetFields();
    },
    getEditData() {
      this.$api.customer
        .getFactorById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            this.formData = res.data.data;
            if (this.formData.floorval == 0 && this.formData.ceilval == 0) {
              this.isTrue = 2;
            }
          }
        });
    },
    getFactor(pointId) {
      this.$api.common.selectFactorByPointId({ pointId: pointId }).then(res => {
        if (res.data.state == 0) {
          this.factorOptions = res.data.data;
        }
      });
    },
    handleChange(value) {
      this.isTrue = 1;
      this.factorOptions.forEach(item => {
        if (item.id == value) {
          this.formData.floorval =
            item.floorval != null ? Number(item.floorval) : "";
          this.formData.ceilval =
            item.ceilval != null ? Number(item.ceilval) : "";
          this.$forceUpdate();
        }
      });
    },
    changeFloor(value) {
      this.formData.floorval = value;
      this.$forceUpdate();
    },
    changeCeil(value) {
      this.formData.ceilval = value;
      this.$forceUpdate();
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.getFactor(this.$route.query.id);
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
    },
    isTrue: {
      handler: function(n) {
        this.formData.floorval = "";
        this.formData.ceilval = "";
        if (n == 2) {
          this.formData.floorval = 0;
          this.formData.ceilval = 0;
        }
      }
    },
    deep: true
  }
};
</script>
<style lang="less" scoped></style>
