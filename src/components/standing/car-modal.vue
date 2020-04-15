<template>
  <a-modal
    :title="carModal.type == 'add' ? '新增车辆信息' : '编辑车辆信息'"
    v-model="carModal.show"
    @cancel="handleCancel"
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
          placeholder="输入车牌"
          v-decorator="[
            'number',
            { rules: [{ required: true, message: '请输入车牌' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="品牌型号">
        <a-input placeholder="输入品牌型号" v-decorator="['model']" />
      </a-form-item>
      <a-form-item label="车架号">
        <a-input placeholder="输入车架号" v-decorator="['frameNumber']" />
      </a-form-item>
      <a-form-item label="购置时间">
        <a-date-picker
          placeholder="选择购置时间"
          v-decorator="['gmtPurchase']"
        />
      </a-form-item>
      <a-form-item label="上次年检时间">
        <a-date-picker
          placeholder="选择上次年检时间"
          v-decorator="['gmtInspection']"
        />
      </a-form-item>
      <a-form-item label="GPS">
        <a-input placeholder="输入GPS" v-decorator="['gps']" />
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
        this.format.setFieldsValue(nval.detail);
      }
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields((err, values) => {
        values.gmtPurchase = this.$moment(values.gmtPurchase).format(
          "YYYY-MM-DD hh:mm:ss"
        );
        values.gmtInspection = this.$moment(values.gmtInspection).format(
          "YYYY-MM-DD hh:mm:ss"
        );

        if (!err) {
          this.$api.car.addAssetVehicle(values).then(res => {
            if (res.data.state == 0) {
              this.$message.success("添加成功");
              this.carModal.show = false;
              this.$emit("refresh");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    handleCancel() {
      this.carModal.show = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
