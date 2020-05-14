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
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="小组名称" prop="name">
        <a-input
          :maxLength="30"
          placeholder="小组名称"
          v-model.trim="formData.name"
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
    groupDetail: {
      required: false
    }
  },
  data() {
    return {
      formData: {
        name: ""
      },
      groupId: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入小组名称",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    title() {
      if (this.groupId) {
        return "编辑小组";
      } else {
        return "新建小组";
      }
    }
  },
  watch: {
    groupDetail(nval) {
      if (nval) {
        this.groupId = nval.id;
        setTimeout(() => {
          this.formData = {
            name: nval.name
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
      this.groupId = "";
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.groupId) {
          this.editGroup(this.formData);
        } else {
          this.addGroup(this.formData);
        }
      });
    },
    editGroup(values) {
      let params = values;
      params.id = this.groupId;
      this.$api.organization
        .editSysGroup(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("修改小组成功");
            this.$emit("updateTable");
            this.closeModal();
          }
        })
        .catch(() => {
          this.closeModal();
        });
    },
    addGroup(values) {
      let params = values;
      this.$api.organization
        .addSysGroup(params)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("新建小组成功");
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
