<template>
  <a-modal
    :title="title + '监测点'"
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
      <a-form-model-item label="所属企业" prop="enterpriseId">
        <a-select placeholder="所属企业" v-model="formData.enterpriseId">
          <a-select-option
            v-for="item in enterpriseList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="监测点名称" prop="name">
        <a-input v-model="formData.name" placeholder="监测点名称" />
      </a-form-model-item>
      <a-form-model-item label="MN号码" prop="mn">
        <a-input v-model="formData.mn" placeholder="MN号码" />
      </a-form-model-item>
      <a-form-model-item label="经维度" prop="lngandlat">
        <div @click="onLnglat()">
          <a-input placeholder="请选择经维度" v-model="formData.lngandlat">
            <a-tooltip slot="suffix">
              <a-icon type="environment" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </div>
        <!-- <a-input placeholder="监测点地图" v-model="formData.lngandlat" /> -->
      </a-form-model-item>
      <a-form-model-item label="监测点类型" prop="type">
        <a-select placeholder="监测点类型" v-model="formData.type">
          <a-select-option
            v-for="item in pointOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="传输类型" prop="transferType">
        <a-select v-model="formData.transferType" placeholder="传输类型">
          <a-select-option value="1">有线传输</a-select-option>
          <a-select-option value="2">无线传输</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="传输协议" prop="protocolType">
        <a-select v-model="formData.protocolType" placeholder="传输协议">
          <a-select-option value="0">扩展协议</a-select-option>
          <a-select-option value="05">05协议</a-select-option>
          <a-select-option value="17">7协议</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
export default {
  props: {
    pointOptions: Array,
    value: Object
  },
  data() {
    return {
      title: "新增",
      enterpriseList: [],
      formData: {
        // name: "",
        // regionId: "",
        // address: "",
        // code: "",
        // environmentPrincipal: "",
        // phone: "",
        // controlLevel: "",
        // industryId: "",
        // introduction: ""
      },
      rules: {
        enterpriseId: [
          {
            required: true,
            message: "请选择所属企业",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入监测点名称",
            trigger: "blur"
          }
        ],
        mn: [
          {
            required: true,
            message: "请输入MN号码",
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
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        if (this.modelData.type == "edit") {
          this.$api.customer.editStation(this.formData).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        } else {
          this.$api.customer.addStation(this.formData).then(res => {
            if (res.data.state == 0) {
              this.$message.success("新增成功");
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
    getEditData() {
      this.$api.customer
        .getStationById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            let result = res.data.data;
            this.formData = result;
            if (result.longitude != null && result.latitude != null)
              this.formData.lngandlat =
                result.longitude + "," + result.latitude;
          }
        });
    },
    enterpriseOptions() {
      this.$api.common.selectEnterprise().then(res => {
        this.enterpriseList = res.data.data;
      });
    },
    onLnglat() {
      console.log("map");
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.enterpriseOptions();
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "新增";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
