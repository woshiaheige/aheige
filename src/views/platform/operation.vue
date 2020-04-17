<template>
  <a-card :bordered="false" class="contract" title="设置运维参数">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 10 }"
      :wrapper-col="{ span: 14 }"
    >
      <!-- <a-form-item label="签到验证">
        <a-radio-group v-model="formValue.verify">
          <a-radio
            :value="item.id"
            v-for="(item, index) of verifyList"
            :key="index"
            >{{ item.label }}</a-radio
          >
        </a-radio-group>
      </a-form-item>
      <a-form-item label="验证距离">
        <counter v-model="formValue.distance">
          <span slot="uni">米</span>
        </counter>
      </a-form-item> -->
      <!-- <a-form-item label="警报设置"> </a-form-item> -->
      <a-form-item label="报警间隔时间">
        <counter v-model="formValue.spaceMin.value">
          <span slot="uni">分</span>
        </counter>
      </a-form-item>
      <!-- <a-form-item label="合同设置"> </a-form-item> -->
      <a-form-item label="合同到期提醒天数">
        <counter v-model="formValue.remind.value">
          <span slot="uni">天</span>
        </counter>
      </a-form-item>
      <!-- <a-form-item label="任务设置"> </a-form-item> -->
      <a-form-item label="任务完成时限">
        <counter v-model="formValue.mission.value">
          <span slot="uni">小时</span>
        </counter>
      </a-form-item>
      <a-row type="flex" justify="center" :gutter="20">
        <a-col>
          <a-button type="primary" html-type="submit" @click="initData">
            重置设置
          </a-button>
        </a-col>
        <a-col>
          <a-button type="primary" html-type="submit" @click="onSubmit">
            保存设置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import counter from "@/components/platform/operation/counter";
export default {
  components: { counter },
  data() {
    return {
      form: this.$form.createForm(this, { name: "templateEdit" }),
      formValue: {
        // verify: 0,
        // distance: 0, //验证距离
        spaceMin: { id: "", value: "" }, //最小间隔时间
        remind: { id: "", value: "" }, //到期提醒天数
        mission: { id: "", value: "" }
      },
      verifyList: [
        {
          label: "不验证",
          id: 0
        },
        {
          label: "计算距离但不强制验证",
          id: 1
        },
        {
          label: "签到必须满足设置距离",
          id: 2
        }
      ]
    };
  },
  methods: {
    initData() {
      this.geDictByParam();
    },
    geDictByParam() {
      let params = [
        "SYS_PARAMETER_WARN_INTERVAL",
        "SYS_PARAMETER_CONTRACT_REMINDER",
        "SYS_PARAMETER_TASK_COMPLETION"
      ];
      this.$api.common.geDictByParam(params).then(res => {
        let data = res.data;
        data.forEach(item => {
          switch (item.code) {
            case "SYS_PARAMETER_WARN_INTERVAL":
              this.formValue.spaceMin = { id: item.id, value: item.value };
              break;
            case "SYS_PARAMETER_CONTRACT_REMINDER":
              this.formValue.remind = { id: item.id, value: item.value };
              break;
            case "SYS_PARAMETER_TASK_COMPLETION":
              this.formValue.mission = { id: item.id, value: item.value };
              break;
          }
        });
      });
    },
    onSubmit() {
      let params = Object.values(this.formValue);
      this.$api.platform.updateBatchById(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.geDictByParam();
  }
};
</script>
