<template>
  <a-modal
    :width="800"
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
        <a-transfer
          :listStyle="{
            height: '300px',
            width: '250px'
          }"
          showSearch
          @change="handleChange"
          @selectChange="handleSelectChange"
          :dataSource="factorOptions"
          :titles="['可选', '已选']"
          :targetKeys="formData.divisorIds"
          :selectedKeys="selectedKeys"
          :render="item => item.title"
          :disabled="formData.type == undefined"
        />
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
      selectedKeys: [],
      fetching: false, //搜索中
      lastFetchId: 0,
      title: "新建",
      deviceTypeOptions: [], //监测类型
      stationOptions: [],
      pointOptions: [],
      factorOptions: [],
      fileList: [],
      formData: {
        type: undefined,
        divisorIds: []
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
    handleChange(nextTargetKeys) {
      this.formData.divisorIds = nextTargetKeys;
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    },
    searchDivisor(value, divisorName) {
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      let params = {
        type: value,
        name: typeof divisorName == "string" ? divisorName : ""
      };
      this.$api.platform.sysDivisorQuery(params).then(res => {
        if (res.data.state == 0) {
          if (fetchId !== this.lastFetchId) {
            return;
          }
          let _data = res.data.data || [];
          let temp = [];
          _data.forEach(element => {
            temp.push({
              title:
                element.name +
                " / " +
                element.code +
                " / " +
                (element.protocolType == 0
                  ? "拓展协议"
                  : element.protocolType + "协议"),
              key: element.id
            });
          });
          this.factorOptions = temp;
          this.fetching = false;
        }
      });
    },
    //限制长度
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
        let temp = [];
        let _factorOptions = this.factorOptions || [];
        let _divisorIds = this.formData.divisorIds || [];
        _divisorIds.forEach(divElement => {
          _factorOptions.forEach(factorElement => {
            if (factorElement.key == divElement) {
              temp.push(divElement);
            }
          });
        });
        let data = {
          id: this.formData.id,
          divisorIds: temp,
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
        })
        .then(() => {
          this.searchDivisor();
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
      let data = {
        code: "SYS_POINT_TYPE"
      };
      this.$api.common.geDictByParam(data).then(res => {
        this.pointOptions = res.data.data;
      });
    },
    //监测类型
    getDeviceType() {
      let data = {
        code: "DEVICE_TYPE"
      };
      this.$api.common.geDictByParam(data).then(res => {
        this.deviceTypeOptions = res.data.data;
      });
    },
    getDivisorList() {
      let params = { divisorIds: this.formData.divisorIds };
      this.$api.common.listByIds(params).then(res => {
        if (res.data.state == 0) {
          let _data = res.data.data || [];
          let temp = [];
          _data.forEach(element => {
            temp.push({
              title:
                element.name +
                " / " +
                element.code +
                " / " +
                element.protocolType +
                "协议",
              key: element.id
            });
          });
          this.factorOptions = temp;
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
