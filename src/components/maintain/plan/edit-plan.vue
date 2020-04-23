<template>
  <a-modal
    title="编辑计划"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="计划名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label="计划日期" prop="range">
        <a-select v-model="form.date">
          <a-select-option v-for="item in dateList" :key="item.value">{{
            item.name
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="运维期限" prop="range">
        <a-range-picker v-model="form.range"></a-range-picker>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    planDetail: {
      required: false,
      type: Object
    }
  },
  data() {
    return {
      form: {
        name: "",
        date: 1
      },
      rules: {}
    };
  },
  computed: {
    dateList() {
      if (this.planDetail.type == 1) {
        return [
          { name: "星期一", value: 1 },
          { name: "星期二", value: 2 },
          { name: "星期三", value: 3 },
          { name: "星期四", value: 4 },
          { name: "星期五", value: 5 },
          { name: "星期六", value: 6 },
          { name: "星期日", value: 0 }
        ];
      } else {
        let arr = [];
        for (let i = 1; i <= 31; i++) {
          arr.push({
            name: i + "号",
            value: i
          });
        }
        return arr;
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.form = {
          name: this.planDetail.name,
          range: [
            this.$moment(this.planDetail.gmtBegin),
            this.$moment(this.planDetail.gmtEnd)
          ]
        };
      }
    }
  },
  methods: {
    closeModal() {
      this.$refs.form.resetFields();
      this.$emit("close");
    },
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            id: this.schemeDetail.id,
            maintainType: this.maintainType,
            name: this.form.name,
            type: this.form.type
          };

          this.$api.maintain.editScheme(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.closeModal();
            }
          });
        }
      });
    }
  }
};
</script>
