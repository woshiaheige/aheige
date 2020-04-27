<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="closeModal"
    okText="保存"
    :maskClosable="false"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="行业名称">
        <a-input
          placeholder="请输入"
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: '请输入行业名称,长度不超30字',
                  max: 30
                }
              ]
            }
          ]"
        />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button @click="closeModal">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
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
      form: this.$form.createForm(this, "industryEdit"),
      industryId: ""
    };
  },
  computed: {
    title() {
      let title = this.industryDetail ? "编辑行业" : "新建行业";
      return title;
    }
  },
  watch: {
    industryDetail(nval) {
      if (nval) {
        this.industryId = nval.id;
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
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.industryId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.industryId) {
            this.editIndustry(values);
          } else {
            this.addIndustry(values);
          }
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
