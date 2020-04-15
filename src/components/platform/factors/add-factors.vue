<template>
  <div>
    <a-modal
      :width="700"
      title="新增"
      :visible="visible"
      @ok="handleOk"
      okText="确定"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="form"
        :rules="rules"
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-row>
          <a-col :span="12"
            ><a-form-model-item label="因子名称" prop="name">
              <a-input
                v-model="form.name"
                placeholder="输入因子名称"
              /> </a-form-model-item
          ></a-col>
          <a-col :span="12"
            ><a-form-model-item label="因子编码" prop="code">
              <a-input
                v-model="form.code"
                placeholder="输入因子编号"
              /> </a-form-model-item
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="12"
            ><a-form-model-item label="均值单位" prop="avgUnit">
              <a-input
                v-model="form.avgUnit"
                placeholder="输入均值单位"
              /> </a-form-model-item
          ></a-col>
          <a-col :span="12"
            ><a-form-model-item label="总量单位" prop="sumUnit">
              <a-input
                v-model="form.sumUnit"
                placeholder="输入总量单位"
              /> </a-form-model-item
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="因子类型" prop="type">
              <a-select v-model="form.type" placeholder="选择因子类型">
                <a-select-option value="32">废水</a-select-option>
                <a-select-option value="31">废气</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12"
            ><a-form-model-item label="协议类型" prop="protocolType">
              <a-select v-model="form.protocolType" placeholder="选择协议类型">
                <a-select-option value="5">05协议</a-select-option>
                <a-select-option value="17">17协议</a-select-option>
                <a-select-option value="0">扩张协议</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12"
            ><a-form-model-item
              label="参考值上限"
              prop="ceilval"
              placeholder="输入参考值上限"
            >
              <a-input-number
                :max="100000"
                :step="0.0001"
                style="width:100%"
                v-model="form.ceilval"
              ></a-input-number> </a-form-model-item
          ></a-col>
          <a-col :span="12"
            ><a-form-model-item
              label="参考值下限"
              prop="floorval"
              placeholder="输入参考值下限"
            >
              <a-input-number
                :min="-100000"
                :step="0.0001"
                style="width:100%"
                v-model="form.floorval"
              ></a-input-number> </a-form-model-item
          ></a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validateC = (rule, value, callback) => {
      if (!this.form.ceilval) {
        callback();
      } else if (value < this.form.floorval) {
        callback(new Error("上限值不能小于下限值"));
      } else {
        callback();
      }
    };
    let validateF = (rule, value, callback) => {
      if (!this.form.floorval) {
        callback();
      } else if (value > this.form.ceilval) {
        callback(new Error("下限值不能大于上限值"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        code: "",
        avgUnit: "",
        sumUnit: "",
        type: "32",
        protocolType: "17",
        ceilval: "",
        floorval: ""
      },
      rules: {
        name: [
          { required: true, message: "污染物名称不能为空" },
          {
            min: 1,
            max: 15,
            message: "污染物名称长度应在1-15个字符之间",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "污染物编码不能为空" },
          { min: 1, max: 6, message: "污染编码长度应在1-6个字符之间" }
        ],
        avgUnit: [{ max: 10, message: "均值单位长度应在1-10个字符之间" }],
        sumUnit: [{ max: 10, message: "总量单位长度应在1-10个字符之间" }],
        type: [{ required: true, message: "类型不能为空" }],
        protocolType: [{ required: true, message: "协议类型不能为空" }],
        ceilval: [{ validator: validateC }],
        floorval: [{ validator: validateF }]
      }
    };
  },
  methods: {
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = this.form;
          this.$api.platform.addSysDivisor(params).then(res => {
            if (res.data.state == 0) {
              this.$emit("confirm");
              this.$message.success("新建因子成功");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });

      console.log("handleOk");
    },
    handleCancel() {
      console.log("handleCancel");
      this.$emit("cancel");
    }
  }
};
</script>

<style></style>
