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
          return false;
        }
        //验证通过
        let data = {
          cusPointId: this.modelData.row.id,
          stopReason: this.formData.desc
        };
        let that = this;
        this.handleCancel();
        if (this.modelData.type == "close") {
          this.$confirm({
            content: "若停运该监测点，将不再生成任务，次日起生效",
            onOk: () => {
              that.$api.customer.stopPoint(data).then(res => {
                if (res.data.state == 0) {
                  that.$message.success("停运成功");
                  that.$emit("refresh");
                }
              });
            }
          });
        } else {
          this.$confirm({
            content: "若恢复该监测点，则重新生成任务，次日起生效",
            onOk: () => {
              that.$api.customer.startPoint(data).then(res => {
                if (res.data.state == 0) {
                  that.$message.success("启动成功");
                  that.$emit("refresh");
                }
              });
            }
          });
        }
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
      if (this.value.type == "close") {
        this.title = "停运" + this.value.row.name;
      } else {
        this.title = "启动" + this.value.row.name;
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
