<template>
  <a-modal
    :title="title"
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
      <a-form-model-item label="方案名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label="计划类别" prop="type">
        <a-select showSearch v-model="form.type" placeholder="请选择">
          <a-select-option :value="1">周计划</a-select-option>
          <a-select-option :value="2">月计划</a-select-option>
        </a-select>
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
    schemeDetail: {
      required: false,
      type: Object
    },
    maintainType: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      form: {
        name: "",
        type: 1
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入方案名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择计划类别",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    title() {
      if (this.schemeDetail.id) {
        return "编辑方案";
      } else {
        return "新建方案";
      }
    }
  },
  watch: {
    schemeDetail(newVal) {
      if (newVal.id) {
        this.form.name = newVal.name;
        this.form.type = newVal.type;
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
            maintainType: this.maintainType,
            name: this.form.name,
            type: this.form.type
          };

          this.$api.maintain.addScheme(data).then(res => {
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
