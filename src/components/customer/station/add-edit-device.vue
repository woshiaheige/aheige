<template>
  <a-modal
    :title="title + '设备'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="设备" prop="sysInstrumentId">
        <a-select
          v-model="formData.sysInstrumentId"
          placeholder="设备"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="(item, index) in deviceOptions"
            :key="index"
            :value="item.id"
            >{{ item.manufacturer }} | {{ item.name }} |
            {{ item.number }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="验收时间" prop="gmtReceptionTime">
        <a-date-picker v-width="350" v-model="formData.gmtReceptionTime" />
      </a-form-model-item>
      <a-form-model-item label="验收材料">
        <a-upload
          name="file"
          :multiple="true"
          :action="serverUrl"
          :fileList="fileList"
          @change="handleChange"
          :remove="handleRemove"
          :beforeUpload="beforeUpload"
          :headers="{
            token: token
          }"
        >
          <a-button> <a-icon type="upload" /> 上传材料</a-button>
          <span v-margin:left="10">上传材料大小不能超过10MB</span>
        </a-upload>
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
      </a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      title: "添加",
      stationOptions: [],
      factorOptions: [],
      deviceOptions: [],
      fileList: [],
      formData: {},
      rules: {
        sysInstrumentId: [
          {
            required: true,
            message: "请选择设备名称",
            trigger: "change"
          }
        ]
      },
      serverUrl: this.$api.common.uploadFileArr, // 上传图片服务器地址
      token: JSON.parse(sessionStorage.getItem("userinfo")).token
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
  mounted() {},
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        let data = {
          id: this.formData.id,
          cusPointId: this.$route.query.id,
          sysInstrumentId: this.formData.sysInstrumentId,
          fileId: this.formData.fileId,
          gmtReceptionTime: this.formData.gmtReceptionTime
        };
        if (data.gmtReceptionTime) {
          data.gmtReceptionTime = this.$moment(data.gmtReceptionTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        }
        if (this.modelData.type == "edit") {
          this.$api.customer
            .editDeviceByPointId(data)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("编辑成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        } else {
          this.$api.customer
            .addDeviceByPointId(data)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("新建成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    beforeUpload(file) {
      this.isError = false;
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        this.isError = true;
      }
      return isLt10M;
    },
    handleChange(info) {
      let fileList = [...info.fileList];

      fileList = fileList.slice(-1);

      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      this.fileList = fileList;
      if (info.file.status === "done") {
        this.formData.fileId = info.file.response.data;
        this.$message.success("上传成功");
      } else if (info.file.status === "error") {
        this.$message.error("上传失败");
      }
    },
    //删除文件
    handleRemove() {
      this.formData.fileId = "";
    },
    getEditData() {
      this.$api.customer
        .getDeviceByPointId({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            if (res.data.data.fileName) {
              this.fileList = [
                {
                  uid: "-1",
                  name: res.data.data.fileName,
                  status: "done",
                  url: ""
                }
              ];
            }
            if (res.data.data.gmtReceptionTime != null) {
              res.data.data.gmtReceptionTime = this.$moment(
                res.data.data.gmtReceptionTime
              );
            }
            this.formData = res.data.data;
          }
        });
    },
    //站点下拉
    getStation() {
      this.$api.common.selectStation().then(res => {
        if (res.data.state == 0) {
          this.stationOptions = res.data.data;
        }
      });
    },
    //因子下拉
    getFactor() {
      this.$api.common.selectFactor().then(res => {
        if (res.data.state == 0) {
          this.factorOptions = res.data.data;
        }
      });
    },
    //设备下拉
    getDevice() {
      this.$api.common
        .selectDevice({
          type: this.$route.query.type
        })
        .then(res => {
          if (res.data.state == 0) {
            this.deviceOptions = res.data.data;
          }
        });
    }
  },
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.getDevice();
        // this.getStation();
        // this.getFactor();
        this.fileList = [];
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "添加";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
