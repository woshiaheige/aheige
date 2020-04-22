<template>
  <a-modal
    title="编辑计划"
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
      <a-form-model-item label="计划名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label="运维期限" prop="range">
        <a-range-picker v-model="form.range"></a-range-picker>
      </a-form-model-item>
      <a-form-model-item label="运维小组" prop="group">
        <a-select v-model="form.group">
          <a-select-option :value="1">小组1</a-select-option>
          <a-select-option :value="2">小组2</a-select-option>
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
    planDetail: {
      required: false,
      type: Object
    }
  },
  data() {
    return {
      form: {
        name: "",
        type: 1
      },
      rules: {}
    };
  },
  watch: {
    planDetail(newVal) {
      if (newVal.id) {
        this.form = {
          name: newVal.name,
          range: [this.$moment(newVal.gmtBegin), this.$moment(newVal.gmtEnd)]
        };
      }
    }
  },
  methods: {
    closeModal() {
      this.$refs.form.resetFields();
      this.$emit("close");
    },
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.schemeDetail.id) {
            this.editScheme();
          } else {
            this.addScheme();
          }
        }
      });
    },
    editScheme() {
      let data = {
        id: this.schemeDetail.id,
        maintainType: this.maintainType,
        name: this.form.name,
        type: this.form.type
      };

      this.$api.maintain.editScheme(data).then(res => {
        if (res.data.state == 0) {
          this.$message.success("编辑成功");
          this.reset();
          this.closeModal();
        }
      });
    },
    addScheme() {
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
  }
};
</script>
