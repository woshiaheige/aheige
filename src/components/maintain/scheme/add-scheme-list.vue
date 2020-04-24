<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :maskClosable="false"
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
        return "编辑项目";
      } else {
        return "新增项目";
      }
    }
  },
  watch: {
    schemeListDetail(newVal) {
      if (newVal.id) {
        this.form.name = newVal.name;
        this.form.remark = newVal.remark;
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
          if (this.schemeListDetail.id) {
            this.editSchemeList();
          } else {
            this.addSchemeList();
          }
        }
      });
    },
    editSchemeList() {
      let data = {
        id: this.schemeListDetail.id,
        name: this.form.name,
        remark: this.form.remark,
        programmeId: this.schemeId
      };

      this.$api.maintain.editSchemeList(data).then(res => {
        if (res.data.state == 0) {
          this.$message.success("编辑成功");
          this.reset();
          this.closeModal();
        }
      });
    },
    addSchemeList() {
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
  }
};
</script>
