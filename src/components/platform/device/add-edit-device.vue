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
      <a-form-model-item label="设备名称" prop="name">
        <a-input
          placeholder="请输入"
          v-model.trim="formData.name"
          @change="formDataName"
        />
      </a-form-model-item>
      <a-form-model-item label="生产厂家" prop="manufacturer">
        <a-input
          placeholder="请输入"
          v-model.trim="formData.manufacturer"
          @change="formDataManufacturer"
        />
      </a-form-model-item>
      <a-form-model-item label="设备型号" prop="number">
        <a-input
          placeholder="请输入"
          v-model.trim="formData.number"
          @change="formDataNumber"
        />
      </a-form-model-item>
      <a-form-model-item label="设备类型" prop="deviceType">
        <a-select
          placeholder="请选择"
          v-model="formData.deviceType"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in deviceTypeOptions"
            :key="item.value"
            :value="Number(item.value)"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="监测类型" prop="type">
        <a-select
          placeholder="请选择"
          v-model="formData.type"
          showSearch
          :filterOption="filterOptions"
          @change="searchDivisor"
        >
          <a-select-option
            v-for="item in pointOptions"
            :key="item.value"
            :value="Number(item.value)"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="监测因子" prop="divisorIds">
        <a-select
          :disabled="formData.type == undefined"
          placeholder="请选择"
          mode="multiple"
          v-model="formData.divisorIds"
          :filterOption="false"
          @search="searchDivisor(formData.type, $event)"
          :notFoundContent="fetching ? undefined : null"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option
            v-for="(item, index) in factorOptions"
            :key="index"
            :value="item.id"
          >
            {{
              item.name + " / " + item.code + " / " + item.protocolType + "协议"
            }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import base from "@/api/base";

// import debounce from "lodash/debounce";
export default {
  props: {
    value: Object
  },
  data() {
    return {
      fetching: false, //搜索中
      lastFetchId: 0,
      title: "新建",
      deviceTypeOptions: [], //监测类型
      stationOptions: [],
      pointOptions: [],
      factorOptions: [],
      fileList: [],
      formData: {
        type: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "blur"
          }
        ],
        manufacturer: [
          {
            required: true,
            message: "请输入生产厂家",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入设备型号",
            trigger: "blur"
          }
        ],
        deviceType: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择监测类型",
            trigger: "blur"
          }
        ],
        divisorIds: [
          {
            required: true,
            message: "请添加监测因子",
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
    searchDivisor(value, divisorName) {
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      let params = {
        size: 20,
        page: 1,
        type: value,
        name: typeof divisorName == "string" ? divisorName : ""
      };
      this.$api.platform.sysDivisor(params).then(res => {
        console.log(res);
        if (res.data.state == 0) {
          if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return;
          }
          this.factorOptions = res.data.data.records;
          this.fetching = false;
        }
      });
    },
    //限制长度  自带的限制用户体验极差
    formDataName() {
      if (this.formData.name.length > 30) {
        this.formData.name = this.formData.name.substring(0, 29);
      }
    },
    formDataNumber() {
      if (this.formData.number.length > 30) {
        this.formData.number = this.formData.number.substring(0, 29);
      }
    },
    formDataManufacturer() {
      if (this.formData.manufacturer.length > 30) {
        this.formData.manufacturer = this.formData.manufacturer.substring(
          0,
          29
        );
      }
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        let data = {
          id: this.formData.id,
          divisorIds: this.formData.divisorIds,
          fileId: this.formData.fileId,
          gmtReceptionTime: this.formData.gmtReceptionTime,
          manufacturer: this.formData.manufacturer,
          name: this.formData.name,
          number: this.formData.number,
          type: this.formData.type,
          deviceType: this.formData.deviceType
        };
        if (data.gmtReceptionTime) {
          data.gmtReceptionTime = this.$moment(data.gmtReceptionTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        }
        if (this.modelData.type == "edit") {
          this.$api.customer.editDevice(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        } else {
          this.$api.customer.addDevice(data).then(res => {
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
      this.factorOptions = [];
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    getEditData() {
      this.$api.customer
        .getDeviceById({ id: this.modelData.row.id })
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
            this.getDivisorList();
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
    //设备类型下拉
    getPointSelect() {
      let params = ["SYS_POINT_TYPE"];
      this.$api.common.geDictByParam(params).then(res => {
        this.pointOptions = res.data;
      });
    },
    //监测类型
    getDeviceType() {
      let params = ["DEVICE_TYPE"];
      this.$api.common.geDictByParam(params).then(res => {
        this.deviceTypeOptions = res.data;
      });
    },
    getDivisorList() {
      let params = { divisorIds: this.formData.divisorIds };
      this.$api.common.listByIds(params).then(res => {
        if (res.data.state == 0) {
          this.factorOptions = res.data.data;
        }
      });
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function(nval) {
        if (nval.show == true) {
          this.getStation();
          this.getPointSelect();
          this.getDeviceType();
          this.fileList = [];
          if (nval.type == "edit") {
            this.title = "编辑";
            this.getEditData();
          } else {
            this.title = "新建";
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
