<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
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
      <a-form-model-item label="车牌" prop="vehicleId">
        <a-select
          placeholder="请选择"
          v-model="formData.vehicleId"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in carOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.number }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="付款金额" prop="payment">
        <a-input-number
          :maxLength="30"
          :precision="2"
          :min="0"
          style="width:100%"
          placeholder="请输入"
          v-model.trim="formData.payment"
        />
      </a-form-model-item>
      <a-form-model-item label="付款时间" prop="gmtPayment">
        <a-date-picker
          v-width="350"
          placeholder="请选择"
          v-model="formData.gmtPayment"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" html-type="submit" @click="handleOk">
        保存
      </a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    modalInfo: {
      type: Object
    }
  },
  data() {
    return {
      carId: "",
      formData: {
        vehicleId: undefined, //车辆id
        payment: "",
        gmtPayment: undefined,
        type: "1" ////1油费2过路费3保险费4年检费5维修保养费
      },
      carOptions: [],
      rules: {
        vehicleId: [
          { required: true, trigger: "change", message: "请选择车牌" }
        ],
        payment: [
          { required: true, trigger: "change", message: "输入付款金额" }
        ],
        gmtPayment: [
          { required: true, trigger: "change", message: "输入付款时间" }
        ]
      },
      title: "新增费用"
    };
  },
  computed: {},
  watch: {
    modalInfo(nval) {
      if (nval.id) {
        this.carId = nval.id;
        this.title = "编辑费用";
        this.formData = {
          vehicleId: nval.vehicleId,
          payment: nval.payment,
          type: nval.type,
          gmtPayment: nval.gmtPayment
            ? this.$moment(nval.gmtPayment, "YYYY-MM-DD")
            : ""
        };
      }
    }
  },
  methods: {
    reset() {
      this.carId = undefined;
      this.title = "新增费用";
      this.$refs.ruleForm.clearValidate();
      this.formData = this.$options.data().formData;
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        let values = JSON.parse(JSON.stringify(this.formData));
        values.gmtPayment = this.$moment(values.gmtPayment).format(
          "YYYY-MM-DD hh:mm:ss"
        );
        if (this.carId) {
          this.editAssetVehicleCost(values);
        } else {
          this.addAssetVehicleCost(values);
        }
      });
    },
    editAssetVehicleCost(values) {
      //修改
      values.id = this.carId;
      this.$api.car.editAssetVehicleCost(values).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    addAssetVehicleCost(values) {
      //新建
      this.$api.car.addAssetVehicleCost(values).then(res => {
        if (res.data.state == 0) {
          this.$message.success("添加成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    handleCancel() {
      this.$emit("update:visible", false);
      this.reset();
    },
    getAllCar() {
      this.$api.car.getAllCar().then(res => {
        if (res.data.state == 0) {
          this.carOptions = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getAllCar();
  }
};
</script>
<style lang="less" scoped></style>
