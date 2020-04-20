<template>
  <a-modal
    title="新增方案"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="方案名称">
        <a-input placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="计划类别">
        <a-select placeholder="请选择">
          <a-select-option key="1" value="1">周计划</a-select-option>
          <a-select-option key="2" value="2">月计划</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
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
      form: this.$form.createForm(this),
      groupId: ""
    };
  },
  computed: {
    title() {
      if (this.groupName) {
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
      this.groupId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.groupId) {
            this.editGroup(values);
          } else {
            this.addGroup(values);
          }
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
