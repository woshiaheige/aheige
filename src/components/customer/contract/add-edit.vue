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
        <a-input placeholder="合同编号" v-model="formData.number" />
      </a-form-model-item>
      <a-form-model-item label="合同起止时间" prop="range">
        <a-range-picker
          v-model="formData.range"
          :showTime="false"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="合同签署时间" prop="gmtSign">
        <a-date-picker v-width="350" v-model="formData.gmtSign" />
      </a-form-model-item>
      <a-form-model-item label="合同负责人" prop="userName">
        <a-input placeholder="合同负责人" v-model="formData.userName" />
      </a-form-model-item>
      <a-form-model-item label="合同金额" prop="money">
        <a-input-number
          placeholder="合同金额"
          v-model="formData.money"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="合同备注" prop="description">
        <a-input
          type="textarea"
          placeholder="合同备注"
          v-model="formData.description"
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
        >
          <a-button> <a-icon type="upload" /> 选择文件 </a-button>
        </a-upload>
      </a-form-model-item>
    </a-form-model>
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
        gmtSign: "",
        userName: "",
        money: "",
        description: "",
        state: 1
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
        let data = {
          fileId: this.formData.fileId,
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
            res.data.data.range = [
              this.$moment(res.data.data.gmtBegin),
              this.$moment(res.data.data.gmtEnd)
            ];
            res.data.data.gmtSign = this.$moment(res.data.data.gmtSign);
            this.formData = res.data.data;
          }
        });
    },
    handleChange(info) {
      console.log(info);
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
          state: 1
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
