<template>
  <a-modal
    title="新增项目"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="项目名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    schemeId: {
      required: true
    },
    schemeListDetail: {
      required: false
    }
  },
  data() {
    return {
      form: {
        name: "",
        remark: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: false
          }
        ]
      }
    };
  },
  computed: {
    title() {
      if (this.schemeListDetail.id) {
        return "编辑方案";
      } else {
        return "新建方案";
      }
    }
  },
  watch: {
    groupDetail(nval) {
      if (nval) {
        this.groupId = nval.id;
        setTimeout(() => {
          this.form.setFieldsValue({
            name: nval.name
          });
        }, 50);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    reset() {
      this.$refs.form.resetFields();
    },
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            name: this.form.name,
            remark: this.form.remark,
            programmeId: this.schemeId
          };

          this.$api.maintain.addSchemeList(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("添加成功");
              this.reset();
              this.closeModal();
            }
          });
        }
      });
    },
    editGroup(values) {
      let params = values;
      params.id = this.groupId;
      this.$api.organization.editSysGroup(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改小组成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addGroup(values) {
      let params = values;
      this.$api.organization.addSysGroup(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建小组成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
