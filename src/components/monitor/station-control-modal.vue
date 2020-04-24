<template>
  <a-modal
    :visible="visible"
    :title="monitor.poiName + '-' + monitor.operate + '-' + monitor.title"
    :width="800"
    @ok="define"
    @cancel="onCancel"
  >
    <a-row>
      <!-- 超时时间与重发次数 -->
      <a-form-model
        ref="formValidate1"
        v-if="monitor.formIndex == 1"
        :model="formValidate1"
        :rules="ruleValidate1"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="超时时间" prop="overTim">
            <a-select
              filterable
              v-model="formValidate1.overTim"
              placeholder="超时时间"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="1">1秒</a-select-option>
              <a-select-option :value="2">2秒</a-select-option>
              <a-select-option :value="3">3秒</a-select-option>
              <a-select-option :value="5">5秒</a-select-option>
              <a-select-option :value="10">10秒</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="重发次数" prop="reCount">
            <a-select
              v-model="formValidate1.reCount"
              placeholder="重发次数"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="0">不重发</a-select-option>
              <a-select-option :value="1">1次</a-select-option>
              <a-select-option :value="2">2次</a-select-option>
              <a-select-option :value="3">3次</a-select-option>
              <a-select-option :value="5">5次</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 现场机时间 -->
      <a-form-model
        ref="formValidate2"
        v-if="monitor.formIndex == 2"
        :model="formValidate2"
        :rules="ruleValidate2"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="污染物编码" prop="pollCode">
            <a-select
              filterable
              v-model="formValidate2.pollCode"
              placeholder="污染物编码"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                v-for="item in divisorList"
                :key="item.id"
                :value="item.code"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col
          span="24"
          class="col-input-wrap"
          v-if="monitor.command == '1012'"
        >
          <a-form-model-item label="时间" prop="time">
            <a-date-picker
              type="datetime"
              placeholder="时间范围"
              style="width: 200px"
              v-model="formValidate2.time"
            ></a-date-picker>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 实时数据间隔 -->
      <a-form-model
        ref="formValidate3"
        v-if="monitor.formIndex == 3"
        :model="formValidate3"
        :rules="ruleValidate3"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="时间间隔" prop="interval">
            <a-select
              v-model="formValidate3.interval"
              placeholder="时间范围间隔"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="0">30秒</a-select-option>
              <a-select-option :value="1">1分钟</a-select-option>
              <a-select-option :value="2">2分钟</a-select-option>
              <a-select-option :value="3">3分钟</a-select-option>
              <a-select-option :value="4">4分钟</a-select-option>
              <a-select-option :value="5">5分钟</a-select-option>
              <a-select-option :value="10">10分钟</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 分钟数据间隔 -->
      <a-form-model
        ref="formValidate4"
        v-if="monitor.formIndex == 4"
        :model="formValidate4"
        :rules="ruleValidate4"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="间隔时间" prop="time">
            <a-select
              v-model="formValidate4.time"
              placeholder="间隔时间"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="1">1分钟</a-select-option>
              <a-select-option :value="2">2分钟</a-select-option>
              <a-select-option :value="3">3分钟</a-select-option>
              <a-select-option :value="4">4分钟</a-select-option>
              <a-select-option :value="5">5分钟</a-select-option>
              <a-select-option :value="10">10分钟</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 访问密码 -->
      <a-form-model
        ref="formValidate5"
        v-if="monitor.formIndex == 5"
        :model="formValidate5"
        :rules="ruleValidate5"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="密码" prop="password">
            <a-input
              placeholder="密码"
              v-model.trim="formValidate5.password"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 污染物实时数据 -->

      <!-- 设备运行时间日历史数据 -->
      <a-form-model
        ref="formValidate8"
        v-if="monitor.formIndex == 8"
        :model="formValidate8"
        :rules="ruleValidate8"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="开始时间" prop="beginTime">
            <a-date-picker
              type="datetime"
              placeholder="开始时间"
              style="width: 200px"
              v-model="formValidate8.beginTime"
            ></a-date-picker>
          </a-form-model-item>
        </a-col>
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="结束时间" prop="endTime">
            <a-date-picker
              type="datetime"
              placeholder="结束时间"
              style="width: 200px"
              v-model="formValidate8.endTime"
            ></a-date-picker>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 污染物历史数据 -->
      <a-form-model
        ref="formValidate9"
        v-if="monitor.formIndex == 9"
        :model="formValidate9"
        :rules="ruleValidate9"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="数据类型" prop="timetype">
            <a-select
              v-model="formValidate9.timetype"
              placeholder="数据类型"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="0">分钟数据</a-select-option>
              <a-select-option :value="1">小时数据</a-select-option>
              <a-select-option :value="2">日数据</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="开始时间" prop="beginTime">
            <a-date-picker
              type="datetime"
              placeholder="开始时间"
              style="width: 200px"
              v-model="formValidate9.beginTime"
            ></a-date-picker>
          </a-form-model-item>
        </a-col>
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="结束时间" prop="endTime">
            <a-date-picker
              type="datetime"
              placeholder="结束时间"
              style="width: 200px"
              v-model="formValidate9.endTime"
            ></a-date-picker>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 校零校满（仪表） -->
      <a-form-model
        ref="formValidate10"
        v-if="
          monitor.formIndex == '10' ||
            monitor.formIndex == '11' ||
            monitor.formIndex == '12' ||
            monitor.formIndex == '13' ||
            monitor.formIndex == '16' ||
            monitor.formIndex == '17'
        "
        :model="formValidate10"
        :rules="ruleValidate10"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="污染物编码" prop="pollCode">
            <a-select
              v-model="formValidate10.pollCode"
              placeholder="污染物编码"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                v-for="item in divisorList"
                :key="item.id"
                :value="item.code"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 采样时间周期（仪表） -->
      <a-form-model
        ref="formValidate15"
        v-if="monitor.formIndex == 15"
        :model="formValidate15"
        :rules="ruleValidate15"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="污染物编码" prop="pollCode">
            <a-select
              v-model="formValidate15.pollCode"
              placeholder="污染物编码"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                v-for="item in divisorList"
                :key="item.id"
                :value="item.code"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col
          span="24"
          class="col-input-wrap"
          v-if="monitor.command == '3016'"
        >
          <div class="required">
            <a-form-model-item label="起始时间" prop="beginTime">
              <TimePicker
                type="time"
                placeholder="起始时间"
                style="width: 168px"
                v-model="formValidate15.beginTime"
              ></TimePicker>
            </a-form-model-item>
          </div>
        </a-col>
        <a-col
          span="24"
          class="col-input-wrap"
          v-if="monitor.command == '3016'"
        >
          <a-form-model-item label="时间间隔（小时）" prop="time">
            <a-input
              placeholder="时间间隔（小时）"
              v-model.trim="formValidate15.time"
            ></a-input>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <!-- 现场机信息(仪表) -->
      <a-form-model
        ref="formValidate18"
        v-if="monitor.formIndex == 18"
        :model="formValidate18"
        :rules="ruleValidate18"
        :label-width="135"
      >
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="污染物编码" prop="pollCode">
            <a-select
              v-model="formValidate18.pollCode"
              placeholder="污染物编码"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                v-for="item in divisorList"
                :key="item.id"
                :value="item.code"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="类型" prop="type">
            <a-select
              v-model="formValidate18.type"
              placeholder="类型"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="0"
                >提取现场机信息（状态）</a-select-option
              >
              <a-select-option :value="1"
                >提取现场机信息（参数）</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="24" class="col-input-wrap">
          <a-form-model-item label="信息因子编码" prop="infoid">
            <a-select
              v-model="formValidate18.infoid"
              placeholder="信息因子编码"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option
                :value="item.id"
                v-for="item in devList"
                :key="item.id"
                >{{ item.parameterName }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-form-model>
      <div
        ref="formValidate1Show"
        v-if="monitor.formIndex == 19"
        :label-width="135"
      >
        <p v-if="monitor.command == '1012'">
          {{ formValidate2.pollCode }}时间已设置为：{{ show.time }}
        </p>
        <p v-else-if="monitor.command == '1011'">
          {{ formValidate2.pollCode }}时间为：{{ show.time }}
        </p>
      </div>
    </a-row>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    let _this = this;
    const timeRule = function(rule, value, callback) {
      if (!_this.formValidate15.beginTime) {
        return callback(new Error("选择起始时间"));
      } else {
        callback();
      }
    };
    return {
      devList: [], //获取所有参数列表
      divisorList: [], //监测站房信息因子
      current: 0,
      try: 0,
      result: 0,
      formValidate1: {
        overTim: "",
        reCount: ""
      },
      show: "",
      ruleValidate1: {
        overTim: [
          {
            required: true,
            message: "选择超时时间",
            trigger: "change",
            type: "number"
          }
        ],
        reCount: [
          {
            required: true,
            message: "选择重发次数",
            trigger: "change",
            type: "number"
          }
        ]
      },
      formValidate2: {
        pollCode: "",
        time: ""
      },
      ruleValidate2: {
        pollCode: [
          {
            required: true,
            message: "选择超污染物编码",
            trigger: "change",
            type: "string"
          }
        ],
        time: [
          {
            required: true,
            message: "选择时间",
            trigger: "change",
            type: "date"
          }
        ]
      },
      formValidate3: {
        interval: ""
      },
      ruleValidate3: {
        interval: [
          {
            required: true,
            message: "选择时间间隔",
            trigger: "change",
            type: "number"
          }
        ]
      },
      formValidate4: {
        time: ""
      },
      ruleValidate4: {
        time: [
          {
            required: true,
            message: "选择间隔时间",
            trigger: "change",
            type: "number"
          }
        ]
      },
      formValidate5: {
        password: ""
      },
      ruleValidate5: {
        password: [
          {
            required: true,
            message: "输入密码",
            trigger: "change",
            type: "string"
          }
        ]
      },
      formValidate8: {
        beginTime: "",
        endTime: ""
      },
      ruleValidate8: {
        beginTime: [
          {
            required: true,
            message: "选择开始时间",
            trigger: "change",
            type: "date"
          }
        ],
        endTime: [
          {
            required: true,
            message: "选择结束",
            trigger: "change",
            type: "date"
          }
        ]
      },
      formValidate9: {
        timetype: "",
        beginTime: "",
        endTime: ""
      },
      ruleValidate9: {
        timetype: [
          {
            required: true,
            message: "选择数据类型",
            trigger: "change",
            type: "number"
          }
        ],
        beginTime: [
          {
            required: true,
            message: "选择开始时间",
            trigger: "change",
            type: "date"
          }
        ],
        endTime: [
          {
            required: true,
            message: "选择结束时间",
            trigger: "change",
            type: "date"
          }
        ]
      },
      formValidate10: {
        pollCode: ""
      },
      ruleValidate10: {
        pollCode: [
          {
            required: true,
            message: "选择污染物编码",
            trigger: "change",
            type: "string"
          }
        ]
      },
      formValidate15: {
        pollCode: "",
        beginTime: "",
        time: ""
      },
      ruleValidate15: {
        pollCode: [
          {
            required: true,
            message: "选择污染物编码",
            trigger: "change",
            type: "string"
          }
        ],
        beginTime: [{ validator: timeRule, trigger: "change" }],
        time: [
          {
            required: true,
            message: "输入时间间隔（小时）",
            trigger: "change",
            type: "string"
          }
        ]
      },
      formValidate18: {
        pollCode: "",
        type: "",
        infoid: ""
      },
      ruleValidate18: {
        pollCode: [
          {
            required: true,
            message: "选择污染物编码",
            trigger: "change",
            type: "string"
          }
        ],
        type: [
          {
            required: true,
            message: "选择类型",
            trigger: "change",
            type: "number"
          }
        ],
        infoid: [
          {
            required: true,
            message: "选择信息因子编码",
            trigger: "change",
            type: "string"
          }
        ]
      }
    };
  },
  mounted() {},
  watch: {
    visible() {
      if (this.visible) {
        this.getPollCodeList();
      }
    }
  },
  methods: {
    getPollCodeList() {
      let data = this.monitor.pointId;
      this.$api.monitor.getPollCodeList(data).then(res => {
        this.divisorList = res.data.data;
      });
    },
    // 弹窗取消
    onCancel() {
      this.$emit("cancel");
    },
    // 弹窗确认
    define() {
      var _formIndex = this.monitor.formIndex;
      console.log(_formIndex);
      if (
        _formIndex == 11 ||
        _formIndex == 12 ||
        _formIndex == 13 ||
        _formIndex == 16 ||
        _formIndex == 17
      ) {
        _formIndex = 10;
      }
      this.$refs["formValidate" + _formIndex].validate(valid => {
        if (valid) {
          if (this.monitor.operate == "设置") {
            this.$Message.success("设置成功！");
          } else {
            this.$Message.success("提取成功!");
          }
          this.$emit("cancel");
        } else {
          return;
        }
      });
    }
  },
  computed: {
    monitor() {
      return this.modalObj;
    }
  }
};
</script>

<style lang="less" scoped></style>
