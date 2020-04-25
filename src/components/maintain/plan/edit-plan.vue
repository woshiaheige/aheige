<template>
  <a-modal
    title="编辑计划"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :maskClosable="false"
  >
    <a-form-model ref="form" :model="form">
      <a-form-model-item label="计划日期">
        <a-select v-model="form.date" showSearch :filterOption="filterOptions">
          <a-select-option v-for="item in dateList" :key="item.value">{{
            item.name
          }}</a-select-option>
        </a-select>
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
      required: false
    }
  },
  data() {
    return {
      form: { date: 0 },
      groupId: ""
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
        this.form.date = this.planDetail.planDay;
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
            planDay: this.form.date,
            type: this.planDetail.type,
            programmeId: this.planDetail.programmeId
          };

          this.$api.maintain.editPlan(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("修改成功");
              this.closeModal();
            }
          });
        }
      });
    }
  }
};
</script>
