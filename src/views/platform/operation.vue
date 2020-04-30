<template>
  <a-card :bordered="false" class="contract">
    <div class="card-header">
      <div class="title">参数设置</div>
    </div>
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
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
      <a-row>
        <a-col :span="12">
          <a-form-item label="任务生成时间">
            <a-select
              defaultValue="defaultWeek"
              v-model="formValue.missionWeekCreate.value"
              placeholder="请选择"
              style="width:200px"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) of weekList"
                :key="index"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="任务完成时限">
            <counter v-model="formValue.mission.value">
              <span slot="uni">分钟</span>
            </counter>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="周报表推送时间">
            <a-select
              defaultValue="defaultWeek"
              v-model="formValue.missionWeekPush.value"
              placeholder="请选择"
              style="width:200px"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) of weekList"
                :key="index"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="月报表推送时间">
            <a-select
              defaultValue="defaultMonth"
              v-model="formValue.missionMonthPush.value"
              placeholder="请选择"
              style="width:200px"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) of monthList"
                :key="index"
                >{{ item.label }}</a-select-option
              > </a-select
            ><span v-margin:left="10">号</span>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="报警间隔时间">
            <counter v-model="formValue.spaceMin.value">
              <span slot="uni">分</span>
            </counter>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="合同到期提醒天数">
            <counter v-model="formValue.remind.value">
              <span slot="uni">天</span>
            </counter>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center">
        <a-col :span="6">
          <a-form-item>
            <a-button-group>
              <a-button type="primary" html-type="submit" @click="onSubmit">
                保存设置
              </a-button>
              <a-button html-type="submit" @click="initData">
                重置设置
              </a-button>
            </a-button-group>
          </a-form-item>
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
    let monthList = [];
    for (let i = 1; i < 32; i++) {
      monthList.push({ label: i, value: i });
    }
    return {
      form: this.$form.createForm(this, { name: "templateEdit" }),
      formValue: {
        // verify: 0,
        // distance: 0, //验证距离
        missionWeekCreate: { id: "", value: "1" }, //任务生成时间
        missionWeekPush: { id: "", value: "1" }, //周任务推送时间
        missionMonthPush: { id: "", value: "1" }, //月任务推送时间
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
      ],
      defaultWeek: "1",
      defaultMonth: "1",
      weekList: [
        { label: "星期一", value: "1" },
        { label: "星期二", value: "2" },
        { label: "星期三", value: "3" },
        { label: "星期四", value: "4" },
        { label: "星期五", value: "5" },
        { label: "星期六", value: "6" },
        { label: "星期日", value: "7" }
      ],
      monthList
    };
  },
  methods: {
    initData() {
      this.geDictByParam();
    },
    geDictByParam() {
      // let params = [
      //   "SYS_PARAMETER_WEEK_TASK_GENERATE",
      //   "SYS_PARAMETER_WEEK_TASK_PUSH",
      //   "SYS_PARAMETER_MONTH_TASK_PUSH",
      //   "SYS_PARAMETER_WARN_INTERVAL",
      //   "SYS_PARAMETER_CONTRACT_REMINDER",
      //   "SYS_PARAMETER_TASK_COMPLETION"
      // ];
      let data = {
        code: [
          "SYS_PARAMETER_WEEK_TASK_GENERATE",
          "SYS_PARAMETER_WEEK_TASK_PUSH",
          "SYS_PARAMETER_MONTH_TASK_PUSH",
          "SYS_PARAMETER_WARN_INTERVAL",
          "SYS_PARAMETER_CONTRACT_REMINDER",
          "SYS_PARAMETER_TASK_COMPLETION"
        ]
      };
      this.$api.common.geDictByParam(data).then(res => {
        let data = res.data.data;
        data.forEach(item => {
          switch (item.code) {
            case "SYS_PARAMETER_WEEK_TASK_GENERATE":
              this.formValue.missionWeekCreate = {
                id: item.id,
                value: item.value
              };
              break;
            case "SYS_PARAMETER_WEEK_TASK_PUSH":
              this.formValue.missionWeekPush = {
                id: item.id,
                value: item.value
              };
              break;
            case "SYS_PARAMETER_MONTH_TASK_PUSH":
              this.formValue.missionMonthPush = {
                id: item.id,
                value: item.value
              };
              break;

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
        }
      });
    }
  },
  mounted() {
    this.geDictByParam();
  }
};
</script>
