<template>
  <a-modal
    title="调度任务"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="调度日期">
        <a-select placeholder="请选择">
          <a-select-option key="1" value="1">星期一</a-select-option>
          <a-select-option key="2" value="2">星期二</a-select-option>
          <a-select-option key="3" value="3">星期三</a-select-option>
          <a-select-option key="4" value="4">星期四</a-select-option>
          <a-select-option key="5" value="5">星期五</a-select-option>
          <a-select-option key="6" value="6">星期六</a-select-option>
          <a-select-option key="7" value="7">星期日</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="转交人员">
        <a-select placeholder="请选择">
          <a-select-option key="1" value="1">张三</a-select-option>
          <a-select-option key="2" value="2">李四</a-select-option>
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
