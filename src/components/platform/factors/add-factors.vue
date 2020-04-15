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
        :rules="rules"
        :model="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-row>
          <a-col :span="12"
            ><a-form-model-item label="污染物名称" prop="name">
              <a-input v-model="form.name" /> </a-form-model-item
          ></a-col>
          <a-col :span="12"
            ><a-form-model-item label="污染物编码" prop="code">
              <a-input v-model="form.code" /> </a-form-model-item
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="12"
            ><a-form-model-item label="均值单位" prop="avgUnit">
              <a-input v-model="form.avgUnit" /> </a-form-model-item
          ></a-col>
          <a-col :span="12"
            ><a-form-model-item label="总量单位" prop="sumUnit">
              <a-input v-model="form.sumUnit" /> </a-form-model-item
          ></a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="类型" prop="type">
              <a-select v-model="form.type">
                <a-select-option value="32">废水</a-select-option>
                <a-select-option value="31">废气</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12"
            ><a-form-model-item label="协议类型" prop="protocolType">
              <a-select v-model="form.protocolType">
                <a-select-option value="17">17协议</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12"
            ><a-form-model-item label="参考值上限" prop="c">
              <a-input-number
                :max="100000"
                :step="0.0001"
                v-model="form.c"
              ></a-input-number> </a-form-model-item
          ></a-col>
          <a-col :span="12"
            ><a-form-model-item label="参考值下限" prop="f">
              <a-input-number
                :min="-100000"
                :step="0.0001"
                v-model="form.f"
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
      if (!this.form.f) {
        callback();
      } else if (value < this.form.f) {
        callback(new Error("上限值不能小于下限值"));
      } else {
        callback();
      }
    };
    let validateF = (rule, value, callback) => {
      if (!this.form.c) {
        callback();
      } else if (value > this.form.c) {
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
        c: "",
        f: ""
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
        c: [{ validator: validateC }],
        f: [{ validator: validateF }]
      }
    };
  },
  methods: {
    handleOk() {
      this.$emit("cancel");
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
