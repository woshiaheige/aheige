<template>
  <a-modal
    :title="title + '合同'"
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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="所属企业" prop="enterpriseId">
        <a-select
          placeholder="所属企业"
          v-model="formData.enterpriseId"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in enterpriseList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="合同编号" prop="number">
        <a-input
          placeholder="合同编号"
          :maxLength="30"
          v-model="formData.number"
        />
      </a-form-model-item>
      <a-form-model-item label="合同起止时间" prop="range">
        <a-range-picker
          v-model="formData.range"
          :showTime="false"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="合同签署时间" prop="gmtSign">
        <a-date-picker
          v-width="350"
          :maxLength="30"
          v-model="formData.gmtSign"
        />
      </a-form-model-item>
      <a-form-model-item label="合同负责人" prop="userName">
        <a-input
          placeholder="合同负责人"
          :maxLength="30"
          v-model="formData.userName"
        />
      </a-form-model-item>
      <a-form-model-item label="合同金额" prop="money">
        <a-input-number
          placeholder="合同金额"
          v-model="formData.money"
          v-width="350"
          :min="1"
          :max="99999999"
        />
      </a-form-model-item>
      <a-form-model-item label="合同备注" prop="description">
        <a-input
          type="textarea"
          placeholder="合同备注"
          v-model="formData.description"
          :maxLength="300"
        />
      </a-form-model-item>
      <a-form-model-item label="合同状态" prop="state">
        <a-select
          placeholder="合同状态"
          v-model="formData.state"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in statusOption"
            :key="item.value"
            :value="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="合同附件">
        <a-upload
          name="file"
          :multiple="true"
          :action="$base.api + 'files/uploadFile'"
          :fileList="fileList"
          @change="handleChange"
          :remove="handleRemove"
          :beforeUpload="beforeUpload"
        >
          <a-button> <a-icon type="upload" /> 选择文件 </a-button>
          <span v-margin:left="10">上传文件大小不能超过10MB</span>
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
import base from "@/api/base";
export default {
  props: {
    statusOption: Array,
    value: Object
  },
  data() {
    return {
      loading: false,
      enterpriseList: [],
      formData: {
        enterpriseId: undefined,
        number: "",
        range: [],
        gmtSign: null,
        userName: "",
        money: "",
        description: "",
        state: 1,
        files: []
      },
      fileList: [],
      title: "",
      rules: {
        enterpriseId: [
          {
            required: true,
            message: "请选择所属企业",
            trigger: "change"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入合同编号",
            trigger: "blur"
          }
        ],
        gmtSign: [
          {
            required: true,
            message: "请选择合同签署时间",
            trigger: "change"
          }
        ],
        range: [
          {
            required: true,
            message: "请选择合同起止时间",
            trigger: "change"
          }
        ]
      },
      isError: false
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
        let data = {
          files: this.formData.files,
          enterpriseId: this.formData.enterpriseId,
          id: this.formData.id,
          money: this.formData.money,
          number: this.formData.number,
          state: this.formData.state,
          userName: this.formData.userName,
          description: this.formData.description,
          gmtBegin: this.$moment(this.formData.range[0]).format(
            "YYYY-MM-DD hh:mm:ss"
          ),
          gmtEnd: this.$moment(this.formData.range[1]).format(
            "YYYY-MM-DD hh:mm:ss"
          ),
          gmtSign: this.$moment(this.formData.gmtSign).format(
            "YYYY-MM-DD hh:mm:ss"
          )
        };

        if (this.modelData.type == "edit") {
          this.$api.customer.editContract(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        } else {
          this.$api.customer.addContract(data).then(res => {
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
      this.$refs.ruleForm.resetFields();
    },
    getEditData() {
      this.$api.customer
        .getContractById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            let result = res.data.data;
            if (result.files != null) {
              for (var i in result.files) {
                let temp = {};
                temp.uid = i;
                temp.id = result.files[i].fileId;
                temp.name = result.files[i].fileName;
                temp.status = "done";
                temp.url = "";
                this.fileList.push(temp);
              }
            }
            result.range = [
              this.$moment(result.gmtBegin),
              this.$moment(result.gmtEnd)
            ];
            result.gmtSign = this.$moment(result.gmtSign);
            this.formData = result;
          }
        });
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
      //只允许上传一个文件
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      if (this.isError) {
        return;
      }
      this.fileList = fileList;
      if (info.file.status === "done") {
        this.formData.files = []; //只允许上传一个文件
        let temp = {};
        temp.fileId = info.file.response.data;
        temp.fileName = info.file.name;
        this.formData.files.push(temp);
        this.$message.success("上传成功");
      } else if (info.file.status === "error") {
        this.$message.error("上传失败");
      }
    },
    //删除文件
    handleRemove(file) {
      this.formData.files.forEach((item, index) => {
        if (item.fileId == file.id) {
          this.formData.files.splice(index, 1);
          this.delFile(file.id);
        }
      });
    },
    delFile(id) {
      let data = {
        contractId: this.modelData.row.id || "", //合同ID
        fileId: id //文件ID
      };
      this.$api.customer.delContractFile(data).then(() => {});
    },
    enterpriseOptions() {
      this.$api.common.selectEnterprise().then(res => {
        this.enterpriseList = res.data.data;
      });
    }
  },
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.enterpriseOptions();
        this.fileList = [];
        this.formData = {
          state: 1,
          files: []
        };
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
