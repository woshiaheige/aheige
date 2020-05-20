<template>
  <a-modal
    :title="carModal.type == 'add' ? '新建车辆信息' : '编辑车辆信息'"
    v-model="carModal.show"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="formData"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="车牌" prop="number">
        <a-input
          placeholder="请输入"
          :maxLength="30"
          v-model.trim="formData.number"
        />
      </a-form-model-item>
      <a-form-model-item label="车辆品牌" prop="model">
        <a-input
          :maxLength="30"
          placeholder="请输入"
          v-model.trim="formData.model"
        />
      </a-form-model-item>
      <a-form-model-item label="车架号" prop="frameNumber">
        <a-input
          :maxLength="30"
          placeholder="请输入"
          v-model.trim="formData.frameNumber"
        />
      </a-form-model-item>
      <a-form-model-item label="购置时间" prop="gmtPurchase">
        <a-date-picker
          v-width="350"
          placeholder="请选择"
          v-model="formData.gmtPurchase"
        />
      </a-form-model-item>
      <a-form-model-item label="下次年检时间" prop="gmtInspection">
        <a-date-picker
          v-width="350"
          placeholder="请选择"
          v-model="formData.gmtInspection"
        />
      </a-form-model-item>
      <a-form-model-item label="GPS设备号" prop="gps">
        <a-input
          :maxLength="30"
          placeholder="请输入"
          v-model.trim="formData.gps"
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
    value: {
      type: Object
    }
  },
  data() {
    return {
      formData: {
        number: "",
        model: "",
        frameNumber: "",
        gmtPurchase: undefined,
        gmtInspection: undefined,
        gps: ""
      },
      rules: {
        number: [{ required: true, trigger: "change", message: "请输入车牌" }]
      }
    };
  },
  computed: {
    carModal() {
      return this.value;
    }
  },
  watch: {
    value(nval) {
      if (nval.detail) {
        let detail = nval.detail;
        this.carId = nval.detail.id;
        this.formData = {
          number: detail.number,
          model: detail.model,
          frameNumber: detail.frameNumber,
          gmtPurchase: detail.gmtPurchase
            ? this.$moment(detail.gmtPurchase, "YYYY-MM-DD")
            : "",
          gmtInspection: detail.gmtInspection
            ? this.$moment(detail.gmtInspection, "YYYY-MM-DD")
            : "",
          gps: detail.gps
        };
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        let values = JSON.parse(JSON.stringify(this.formData));
        values.gmtPurchase = values.gmtPurchase
          ? this.$moment(values.gmtPurchase).format("YYYY-MM-DD hh:mm:ss")
          : "";
        values.gmtInspection = values.gmtInspection
          ? this.$moment(values.gmtInspection).format("YYYY-MM-DD hh:mm:ss")
          : "";

        if (this.carId) {
          this.editAssetVehicle(values);
        } else {
          this.addAssetVehicle(values);
        }
      });
    },
    editAssetVehicle(values) {
      //修改
      values.id = this.carId;
      this.$api.car.editAssetVehicle(values).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改成功");
          this.$emit("refresh");
          this.handleCancel();
        }
      });
    },
    addAssetVehicle(values) {
      //新建
      this.$api.car.addAssetVehicle(values).then(res => {
        if (res.data.state == 0) {
          this.$message.success("添加成功");
          this.$emit("refresh");
          this.handleCancel();
        }
      });
    },
    handleCancel() {
      this.carModal.show = false;
      this.carId = undefined;
      this.$refs.ruleForm.resetFields();
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
