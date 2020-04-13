<template>
  <a-modal
    :title="title + '员工'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="员工姓名">
        <a-input
          placeholder="员工姓名"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '输入员工姓名' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="员工手机">
        <a-input
          placeholder="员工手机"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '输入员工手机' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="员工邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: '输入正确邮箱地址'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="员工性别">
        <a-select placeholder="员工性别">
          <a-select-option value="girl">女</a-select-option>
          <a-select-option value="man">男</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="部门">
        <a-select placeholder="部门"> </a-select>
      </a-form-item>
      <a-form-item label="员工职位">
        <a-input placeholder="员工职位" />
      </a-form-item>
      <a-form-item label="员工分机号">
        <a-input placeholder="员工分机号" />
      </a-form-item>
      <a-form-item label="员工工作地点">
        <a-input placeholder="员工工作地点" />
      </a-form-item>
      <a-form-item label="员工工号">
        <a-input placeholder="员工工号" />
      </a-form-item>
      <a-form-item label="员工头像">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <a-button>选择图片 </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      title: "新增",
      form: this.$form.createForm(this)
    };
  },
  computed: {
    status: {
      get() {
        return this.obj.show;
      },
      set() {}
    }
  },
  methods: {
    handleOk() {
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("cancel", false);
    }
  },
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        if (this.obj.row != "" && this.obj.row != undefined) {
          this.title = "编辑";
        } else {
          this.title = "新增";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
