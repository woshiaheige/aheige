<template>
  <a-modal
    title="删除知识库"
    :visible="visible"
    @ok="handleOk"
    @cancel="closeModal"
    okText="保存"
    :maskClosable="false"
  >
    <div class="delete-tip">
      <span>
        正在删除知识库
        xxxxx，该操作不可逆，一旦操作成功，知识库下的所有内容将会删除。请输入下面内容再次确认操作。
      </span>
    </div>
    <div class="tip">
      请在下面输入框中输入“xxxxxx“以确认操作
    </div>
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :wrapper-col="{ span: 24 }"
    >
      <a-form-model-item prop="code">
        <a-input
          placeholder="请输入"
          :maxLength="30"
          v-model.trim="formData.code"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button type="danger" v-preventReClick @click="handleOk" block>
        确认删除XXXX
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    industryDetail: {
      required: false
    }
  },
  data() {
    return {
      formData: {
        code: ""
      },
      industryId: ""
    };
  },
  watch: {
    industryDetail(nval) {
      if (nval) {
        this.industryId = nval.id;
        setTimeout(() => {
          this.formData.name = nval.name;
        }, 50);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.industryId = "";
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.industryId) {
          this.editIndustry(this.formData);
        } else {
          this.addIndustry(this.formData);
        }
      });
    },
    editIndustry(values) {
      let params = values;
      params.id = this.industryId;
      this.$api.platform
        .updateSysIndustry(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("修改成功");
            this.$emit("updateTable");
            this.closeModal();
          }
        })
        .catch(() => {
          this.closeModal();
        });
    },
    addIndustry(values) {
      let params = values;
      this.$api.platform
        .addSysIndustry(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("添加成功");
            this.$emit("updateTable");
            this.closeModal();
          }
        })
        .catch(() => {
          this.closeModal();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.delete-tip {
  margin-bottom: 30px;
  text-align: center;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  color: #333;
  border: 1px solid rgba(245, 154, 35, 1);
  background-color: rgba(250, 205, 145, 0.2588235);
}
</style>
