<template>
  <a-modal
    :title="modelData.type == 'out' ? '出库' : '入库'"
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
      <a-form-model-item label="物品名称" prop="goodsId">
        <a-select
          placeholder="物品名称"
          @change="changeName"
          v-model="formData.goodsId"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="item in nameOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="企业"
        prop="enterpriseId"
      >
        <a-select
          v-model="formData.enterpriseId"
          placeholder="企业"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="(item, index) in companyOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="监测点"
        prop="pointId"
      >
        <a-select
          v-model="formData.pointId"
          placeholder="监测点"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="(item, index) in stationOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="设备"
        prop="devId"
      >
        <a-select
          v-model="formData.devId"
          placeholder="设备"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="(item, index) in deviceOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="库存余量" prop="goodsCount">
        <a-input placeholder="库存余量" v-model="list.goodsCount" disabled />
      </a-form-model-item>
      <a-form-model-item label="库存单位" prop="unit">
        <a-input placeholder="库存单位" v-model="list.unit" disabled />
      </a-form-model-item>
      <a-form-model-item
        :label="modelData.type == 'in' ? '入库数量' : '出库数量'"
        prop="stockCount"
      >
        <a-input placeholder="数量" v-model="formData.stockCount" />
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input
          placeholder="输入备注"
          type="textarea"
          v-model="formData.remark"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    let that = this;
    const validateNumber = (rule, value, callback) => {
      if (
        that.modelData.type == "out" &&
        Number(value) > Number(that.list.goodsCount)
      ) {
        callback("库存不足");
      } else {
        callback();
      }
    };
    return {
      companyOptions: [],
      deviceOptions: [],
      stationOptions: [],
      nameOptions: [],
      formData: {},
      list: {},
      rules: {
        goodsId: [
          {
            required: true,
            message: "请选择物品",
            trigger: "change"
          }
        ],
        stockCount: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          },
          { validator: validateNumber, trigger: "blur" }
        ],
        enterpriseId: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change"
          }
        ],
        pointId: [
          {
            required: true,
            message: "请选择监测点",
            trigger: "change"
          }
        ],
        devId: [
          {
            required: true,
            message: "请选择设备",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    modelData() {
      return this.value;
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
        this.formData.type = this.modelData.type == "out" ? 1 : 2;
        this.$api.product.addStock(this.formData).then(res => {
          if (res.data.state == 0) {
            this.$message.success(
              this.modelData.type == "out" ? "出库成功" : "入库成功"
            );
            this.$emit("refresh");
            this.handleCancel();
          }
        });
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    getSelect() {
      this.$api.product.getGoodsSelect().then(res => {
        this.nameOptions = res.data.data;
      });
    },
    changeName(value) {
      console.log(value);
      this.nameOptions.forEach(item => {
        if (item.id == value) {
          this.list = item;
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
    //企业下拉
    getCompany() {
      this.$api.common.selectEnterprise().then(res => {
        if (res.data.state == 0) {
          this.companyOptions = res.data.data;
        }
      });
    },
    //设备下拉
    getDevice() {
      this.$api.common.selectDevice().then(res => {
        if (res.data.state == 0) {
          this.deviceOptions = res.data.data;
        }
      });
    }
  },
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.getSelect();
        if (this.value.type == "out") {
          this.getStation();
          this.getCompany();
          this.getDevice();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
