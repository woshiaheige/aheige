<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="任务说明" prop="content">
        <a-input
          :maxLength="30"
          placeholder="请输入"
          v-model.trim="formData.content"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button key="back" @click="closeModal">取消</a-button>
      <a-button key="go" type="primary" @click="handleOk" v-preventReClick
        >确认</a-button
      >
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
    modelInfo: {
      required: false
    }
  },
  data() {
    return {
      formData: {
        content: ""
      },
      missionId: "",
      rules: {
        content: [
          {
            required: true,
            message: "请输入任务说明",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    title() {
      if (this.missionId) {
        return "编辑突发任务";
      } else {
        return "新建突发任务";
      }
    }
  },
  watch: {
    modelInfo(nval) {
      if (nval) {
        this.missionId = nval.id;
        setTimeout(() => {
          this.formData = {
            content: nval.content
          };
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
      this.missionId = "";
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        this.editGroup(this.formData);
      });
    },
    editGroup(values) {
      let params = values;
      params.id = this.missionId;
      this.$api.maintain
        .editManageTask(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("修改突发任务成功");
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
