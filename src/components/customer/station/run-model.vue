<template>
  <a-modal
    :title="title"
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
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="原因" prop="desc">
        <a-input
          v-model="formData.desc"
          type="textarea"
          :maxLength="300"
          placeholder="原因"
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
    pointOptions: Array,
    value: Object
  },
  data() {
    return {
      formData: {
        desc: ""
      },
      rules: {
        desc: [
          {
            required: true,
            message: "请输入原因",
            trigger: "blur"
          }
        ]
      },
      title: ""
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
        //验证通过
        let data = {
          cusPointId: this.value.row.id,
          stopReason: this.formData.desc
        };

        this.$api.customer
          .stopPoint(data)
          .then(res => {
            if (res.data.state == 0) {
              this.$message.success("停运成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          })
          .catch(() => {
            this.handleCancel();
          });
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.resetFields();
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.title = "停运" + this.value.row.name;
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
