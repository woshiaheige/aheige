<template>
  <a-card :bordered="false" class="index">
    <a-form ref="ruleForm" :form="form" @submit="handleSearch">
      <a-row v-margin:bottom="20">
        <a-col :span="12" class="padlr">
          <a-form-item prop="name" label="审批名称">
            <a-input
              placeholder="输入审批名称"
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入审批名称' }] }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12" class="padlr">
          <a-form-item prop="type" label="选择类型">
            <a-radio-group
              v-decorator="[
                'type',
                { rules: [{ required: true, message: '请选择类型' }] }
              ]"
            >
              <a-radio :value="1">申请物料</a-radio>
              <a-radio :value="2">报价表</a-radio>
              <a-radio :value="3">验收</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-margin:bottom="20">
        <a-col :span="12" class="padlr">
          <a-form-item prop="explain" label="审批说明">
            <a-input
              placeholder="输入审批说明"
              v-decorator="['explain']"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12" class="padlr">
          <a-form-item prop="enterprise" label="企业名称">
            <a-input
              placeholder="输入企业名称"
              v-decorator="['enterprise']"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-margin:bottom="20">
        <a-col :span="12" class="padlr">
          <a-form-item prop="parts" label="配件名称">
            <a-input
              placeholder="输入配件名称"
              v-decorator="['parts']"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12" class="padlr">
          <a-form-item prop="num" label="配件数量">
            <a-input placeholder="输入配件数量" v-decorator="['num']"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, {
        name: "",
        type: "",
        explain: "",
        enterprise: "",
        parts: "",
        num: ""
      })
    };
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },

    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>
<style scoped>
.padlr {
  padding: 0 30px;
  box-sizing: border-box;
}
</style>
