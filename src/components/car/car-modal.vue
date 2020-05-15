<template>
  <a-modal
    :title="carModal.type == 'add' ? '新建车辆信息' : '编辑车辆信息'"
    v-model="carModal.show"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-form
      :form="form"
      ref="ruleForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
      @submit="handleOk"
      v-if="carModal.show"
    >
      <a-form-item label="车牌">
        <a-input
          placeholder="请输入"
          :maxLength="30"
          v-decorator="[
            'number',
            { rules: [{ required: true, message: '请输入车牌' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="车辆品牌">
        <a-input :maxLength="30" placeholder="请输入" v-decorator="['model']" />
      </a-form-item>
      <a-form-item label="车架号">
        <a-input
          :maxLength="30"
          placeholder="请输入"
          v-decorator="['frameNumber']"
        />
      </a-form-item>
      <a-form-item label="购置时间">
        <a-date-picker
          v-width="350"
          placeholder="请选择"
          v-decorator="['gmtPurchase']"
        />
      </a-form-item>
      <a-form-item label="下次年检时间”">
        <a-date-picker
          v-width="350"
          placeholder="请选择"
          v-decorator="['gmtInspection']"
        />
      </a-form-item>
      <a-form-item label="GPS设备号">
        <a-input :maxLength="30" placeholder="请输入" v-decorator="['gps']" />
      </a-form-item>
    </a-form>
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
      form: this.$form.createForm(this, "carModal")
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
        this.form.setFieldsValue({
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
        });
      }
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields((err, values) => {
        values.gmtPurchase = values.gmtPurchase
          ? this.$moment(values.gmtPurchase).format("YYYY-MM-DD hh:mm:ss")
          : "";
        values.gmtInspection = values.gmtInspection
          ? this.$moment(values.gmtInspection).format("YYYY-MM-DD hh:mm:ss")
          : "";

        if (!err) {
          if (this.carId) {
            this.editAssetVehicle(values);
          } else {
            this.addAssetVehicle(values);
          }
        }
      });
    },
    editAssetVehicle(values) {
      //修改
      values.id = this.carId;
      this.$api.car.editAssetVehicle(values).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改成功");
          this.carModal.show = false;
          this.$emit("refresh");
          this.carId = undefined;
        }
      });
    },
    addAssetVehicle(values) {
      //新建
      this.$api.car.addAssetVehicle(values).then(res => {
        if (res.data.state == 0) {
          this.$message.success("添加成功");
          this.carModal.show = false;
          this.$emit("refresh");
          this.carId = undefined;
        }
      });
    },
    handleCancel() {
      this.carModal.show = false;
      this.carId = undefined;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
