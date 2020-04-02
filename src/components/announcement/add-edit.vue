<template>
  <a-modal
    :title="title + '公告'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="公告标题">
        <a-input
          placeholder="公告标题"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="公告内容">
        <a-input
          type="textarea"
          v-decorator="[
            'desc',
            { rules: [{ required: true, message: 'Please input your note!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="公告图片">
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
