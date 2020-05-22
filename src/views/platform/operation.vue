<template>
  <a-card :bordered="false" class="contract">
    <div class="card-header">
      <div class="title">参数设置</div>
    </div>
    <a-tabs default-active-key="1" tab-position="left">
      <a-tab-pane key="1" tab="运维参数">
        <a-form
          ref="formModal"
          :form="form"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
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
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置生成下周任务的时间。如设置星期一，则每周星期一生成下周任务
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="任务完成时限">
                <counter v-model="formValue.mission.value">
                  <span slot="uni">分钟</span>
                </counter>
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    运维人员提交任务至少需要完成的时间，
                    如设置30，则运维人员必须超过30分钟才可提交
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- <a-row>
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
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置周报表推送至企业的时间，如设置星期一，
                    则企业将在星期一收到上周周报表
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
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
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置月报表推送至企业的时间，如设置1号，
                    则企业将在星1号收到上月月报表，如某些月份不存在29，30或31号，
                    则在该月最后一天推送
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </a-form-item>
            </a-col>
          </a-row> -->
          <a-row>
            <a-col :span="12">
              <a-form-item label="签到范围">
                <counter v-model="formValue.range.value" :min="30">
                  <span slot="uni">米</span>
                </counter>
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置运维人员签到的最小范围，如设置100米，
                    则运维人员可在任务地点100米范围内签到
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
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
      </a-tab-pane>
      <a-tab-pane key="2" tab="数据参数">
        <a-form
          ref="formModal"
          :form="form"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-row>
            <a-col :span="12">
              <a-form-item label="恒值判定时限">
                <counter v-model="formValue.constantValue.value">
                  <span slot="uni">小时</span>
                </counter>
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置判定数据为恒指的时限，如设置6小时，
                    则数据持续6小时无产生变化即被判定为恒值
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="零值判定时限">
                <counter v-model="formValue.zeroValue.value">
                  <span slot="uni">小时</span>
                </counter>
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置判定数据为零指的时限，如设置6小时，
                    则数据持续6小时数值为0即被判定为零值
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
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
      </a-tab-pane>
      <a-tab-pane key="3" tab="提醒参数">
        <a-form
          ref="formModal"
          :form="form"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-row>
            <a-col :span="12">
              <a-form-item label="车辆年检到期提醒天数">
                <counter v-model="formValue.carRemindAnnualSurvey.value">
                  <span slot="uni">天</span>
                </counter>
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置车辆年检到期提前提醒天数，如设置30天，
                    则离车辆年检到期还有30天时提醒
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="合同到期提醒天数">
                <counter v-model="formValue.remind.value">
                  <span slot="uni">天</span>
                </counter>
                <a-tooltip v-margin:left="16">
                  <template slot="title">
                    设置合同到期提前提醒天数，如设置30天，
                    则离合同到期还有30天时提醒
                  </template>
                  <a-icon type="question-circle" />
                </a-tooltip>
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
      </a-tab-pane>
    </a-tabs>
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
        mission: { id: "", value: "" },
        range: { id: "", value: "200" }, //签到范围
        carRemindAnnualSurvey: { id: "", value: "" }, //车辆年检到期提醒天数
        zeroValue: { id: "", value: "6" }, //零值判定时限
        constantValue: { id: "", value: "6" } //恒值判定时限
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
      let data = {
        code: [
          "SYS_PARAMETER_WEEK_TASK_GENERATE",
          // "SYS_PARAMETER_WEEK_TASK_PUSH",
          // "SYS_PARAMETER_MONTH_TASK_PUSH",
          "SYS_PARAMETER_WARN_INTERVAL",
          "SYS_PARAMETER_CONTRACT_REMINDER",
          "SYS_PARAMETER_TASK_COMPLETION",
          "CAR_ANNUAL_SURVEY_REMIND_DAY",
          "REGISTRATION_RANGE",
          "ZERO_VALUE",
          "CONSTANT_VALUE"
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
            // case "SYS_PARAMETER_WEEK_TASK_PUSH":
            //   this.formValue.missionWeekPush = {
            //     id: item.id,
            //     value: item.value
            //   };
            //   break;
            // case "SYS_PARAMETER_MONTH_TASK_PUSH":
            //   this.formValue.missionMonthPush = {
            //     id: item.id,
            //     value: item.value
            //   };
            //   break;

            case "SYS_PARAMETER_WARN_INTERVAL":
              this.formValue.spaceMin = { id: item.id, value: item.value };
              break;
            case "SYS_PARAMETER_CONTRACT_REMINDER":
              this.formValue.remind = { id: item.id, value: item.value };
              break;
            case "SYS_PARAMETER_TASK_COMPLETION":
              this.formValue.mission = { id: item.id, value: item.value };
              break;
            case "CAR_ANNUAL_SURVEY_REMIND_DAY":
              this.formValue.carRemindAnnualSurvey = {
                id: item.id,
                value: item.value
              };
              break;
            case "REGISTRATION_RANGE":
              this.formValue.range = { id: item.id, value: item.value };
              break;
            case "ZERO_VALUE":
              this.formValue.zeroValue = { id: item.id, value: item.value };
              break;
            case "CONSTANT_VALUE":
              this.formValue.constantValue = { id: item.id, value: item.value };
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
