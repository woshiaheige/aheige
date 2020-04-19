<template>
  <a-modal
    :title="title + '设备'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="所属监控点" prop="pointId">
        <a-select placeholder="所属监控点" v-model="formData.pointId" disabled>
          <a-select-option
            v-for="item in stationOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="设备名称" prop="name">
        <a-input placeholder="设备名称" v-model="formData.name" />
      </a-form-model-item>
      <a-form-model-item label="生产厂家" prop="manufacturer">
        <a-input placeholder="生产厂家" v-model="formData.manufacturer" />
      </a-form-model-item>
      <a-form-model-item label="设备型号" prop="number">
        <a-input placeholder="设备型号" v-model="formData.number" />
      </a-form-model-item>
      <a-form-model-item label="设备类型" prop="type">
        <a-select placeholder="设备类型" v-model="formData.type">
          <a-select-option
            v-for="item in pointOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="监测因子" prop="divisorId">
        <a-select placeholder="监测因子" v-model="formData.divisorId">
          <a-select-option
            v-for="item in factorOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="验收时间" prop="gmtReceptionTime">
        <a-date-picker
          @change="onChange"
          v-width="350"
          v-model="formData.gmtReceptionTime"
        />
      </a-form-model-item>
      <a-form-model-item label="验收材料">
        <a-upload
          name="file"
          :multiple="true"
          :action="$base.api + 'files/uploadFile'"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 上传材料</a-button>
        </a-upload>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import base from "@/api/base";
export default {
  props: {
    value: Object
  },
  data() {
    return {
      title: "新建",
      stationOptions: [],
      pointOptions: [],
      factorOptions: [],
      formData: {
        pointId: this.$route.query.id
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    modelData: {
      get() {
        return this.value;
      },
      set() {}
    }
  },
  mounted() {
    console.log(base.api);
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        if (this.formData.gmtReceptionTime) {
          this.formData.gmtReceptionTime = this.$moment(
            this.formData.gmtReceptionTime
          ).format("YYYY-MM-DD hh:mm:ss");
        }
        if (this.modelData.type == "edit") {
          this.$api.customer.editDevice(this.formData).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        } else {
          this.$api.customer.addDevice(this.formData).then(res => {
            if (res.data.state == 0) {
              this.$message.success("新建成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
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
    },
    getEditData() {
      this.$api.customer
        .getDeviceById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            this.formData = res.data.data;
            if (res.data.data.gmtReceptionTime != null) {
              this.formData.gmtReceptionTime = this.$moment(
                res.data.data.gmtReceptionTime,
                "YYYY-MM-DD"
              );
            }
          }
        });
    },
    //监测点下拉
    getStation() {
      this.$api.common.selectStation().then(res => {
        if (res.data.state == 0) {
          this.stationOptions = res.data.data;
        }
      });
    },
    //监测点类型下拉
    getPointSelect() {
      let params = ["SYS_POINT_TYPE"];
      this.$api.common.geDictByParam(params).then(res => {
        this.pointOptions = res.data;
      });
    },
    //因子下拉
    getFactor() {
      this.$api.common.selectFactor().then(res => {
        if (res.data.state == 0) {
          console.log(this.factorOptions);
          this.factorOptions = res.data.data;
        }
      });
    }
  },
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.getStation();
        this.getPointSelect();
        this.getFactor();
        this.formData.gmtReceptionTime = "";
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
