<template>
  <a-modal
    :title="title + '设备'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="所属监控点">
        <a-select
          placeholder="所属监控点"
          v-decorator="[
            'title',
            { rules: [{ required: true, message: '请选择所属监控点' }] }
          ]"
        ></a-select>
      </a-form-item>
      <a-form-item label="设备名称">
        <a-input placeholder="设备名称" />
      </a-form-item>
      <a-form-item label="生产厂家">
        <a-input placeholder="生产厂家" />
      </a-form-item>
      <a-form-item label="设备型号">
        <a-input placeholder="设备型号" />
      </a-form-item>
      <a-form-item label="设备类型">
        <a-select placeholder="设备类型">
          <a-select-option value="1">废水</a-select-option>
          <a-select-option value="2">废气</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="监测因子">
        <a-select placeholder="监测因子"></a-select>
      </a-form-item>
      <a-form-item label="验收时间">
        <a-date-picker @change="onChange" v-width="350" />
      </a-form-item>
      <a-form-item label="验收材料">
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 上传材料</a-button>
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
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      // if (info.file.status === "done") {
      //   this.$message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === "error") {
      //   this.$message.error(`${info.file.name} file upload failed.`);
      // }
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
