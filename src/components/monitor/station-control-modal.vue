<template>
  <a-modal
    :visible="visible"
    :title="monitor.poiName + '-' + monitor.operate + '-' + monitor.title"
    :width="800"
    @ok="define"
    @cancel="onCancel"
  >
    <a-spin :spinning="spinning">
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
                <a-select-option value="数采仪">数采仪</a-select-option>
                <a-select-option
                  v-for="item in divisorList"
                  :key="item.id"
                  :value="item.id"
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
                showTime
                placeholder="时间范围"
                style="width: 200px"
                format="YYYY-MM-DD HH:mm:ss"
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
                <a-select-option :value="2051">分钟数据</a-select-option>
                <a-select-option :value="2061">小时数据</a-select-option>
                <a-select-option :value="2031">日数据</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24" class="col-input-wrap">
            <a-form-model-item label="时间范围" prop="time">
              <a-range-picker
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                v-model="formValidate9.time"
              ></a-range-picker>
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
                  :value="item.id"
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
                  :value="item.id"
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
                <a-time-picker
                  v-model="formValidate15.beginTime"
                  format="HH:mm:ss"
                />
              </a-form-model-item>
            </div>
          </a-col>
          <a-col
            span="24"
            class="col-input-wrap"
            v-if="monitor.command == '3016'"
          >
            <a-form-model-item label="时间间隔（小时）" prop="time">
              <a-input-number
                v-model="formValidate15.time"
                :min="1"
                :max="24"
                :step="1"
              />
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
                  :value="item.id"
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
    </a-spin>
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
    return {
      timeLength: 3000,
      spinning: false,
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
        time: this.$moment()
      },
      //现场机时间
      ruleValidate2: {
        pollCode: [
          {
            required: true,
            message: "选择超污染物编码",
            trigger: "change",
            type: "string"
          }
        ],
        time: [{ required: true, message: "选择时间" }]
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
        time: [this.$moment(), this.$moment()]
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
        time: [{ required: true, message: "选择时间" }]
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
        beginTime: this.$moment(),
        time: 1
      },
      ruleValidate15: {
        pollCode: [
          {
            required: true,
            message: "选择污染物编码",
            type: "string"
          }
        ],
        beginTime: [{ required: true, message: "选择起始时间" }],
        time: [
          {
            required: true,
            message: "输入时间间隔（小时）"
          },
          {
            type: "integer",
            message: "间隔时间必须为整数（小时）"
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
    // 根据QN号查询反控结果日志信息
    getResultByQn(qn, command, timeLength) {
      let _this = this;
      _this.timeLength = timeLength;
      _this.$api.monitor.getResultByQn(qn, command).then(rey => {
        this.spinning = true;
        if (rey.data.state == 0) {
          // 1:执行成功 2:执行失败，但不知道原因 3:命令请求条件错误 4:通讯超时 5:系统繁忙不能执行 6:系统故障 100:没有数据
          var timerResult;
          if (!rey.data.data.status) {
            _this.try++;
            if (_this.try == 0) {
              _this.getResultByQn(qn, command, _this.timeLength);
            } else if (_this.try <= 3) {
              timerResult = setTimeout(() => {
                _this.getResultByQn(qn, command, _this.timeLength);
              }, _this.timeLength);
            } else {
              _this.try = 0;
              _this.spinning = false;
              this.$notification.error({
                message: _this.monitor.operate + "失败"
              });
              clearTimeout(timerResult);
            }
          } else if (rey.data.data.status == "1") {
            _this.spinning = false;
            if (rey.data.data.result) {
              this.$notification.success({
                message:
                  _this.monitor.operate + "成功（" + rey.data.data.result + "）"
              });
            } else {
              this.$notification.success({
                message: _this.monitor.operate + "成功"
              });
            }
            clearTimeout(timerResult);
            this.$emit("cancel");
          } else {
            _this.spinning = false;
            this.$notification.error({
              message: _this.monitor.operate + "失败"
            });
            clearTimeout(timerResult);
          }
        }
      });
    },
    //提取采样时间周期 3017
    getSend3017() {
      let data = {
        divisorId: this.formValidate15.pollCode,
        pointId: this.monitor.pointId
      };
      this.$api.monitor
        .getSend3017(data)
        .then(res => {
          if (res.data.state == 0) {
            // this.$message.success("设置成功");
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate15"].resetFields();
          // this.$emit("cancel");
        });
    },
    //设置采样时间周期 3016
    getSend3016() {
      let data = {
        hour: this.formValidate15.time,
        divisorId: this.formValidate15.pollCode,
        pointId: this.monitor.pointId,
        cstartTime: this.formValidate15.beginTime.format("HH:mm:ss")
      };
      this.$api.monitor
        .getSend3016(data)
        .then(res => {
          if (res.data.state == 0) {
            // this.$message.success("设置成功");
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate15"].resetFields();
          // this.$emit("cancel");
        });
    },
    //设置启动清洗 3013
    getSend3013() {
      let data = {
        pointId: this.monitor.pointId,
        divisorId: this.formValidate10.pollCode
      };
      this.$api.monitor
        .getSend3013(data)
        .then(res => {
          if (res.data.state == 0) {
            // this.$message.success("设置成功");
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate10"].resetFields();
          // this.$emit("cancel");
        });
    },
    //设置即时采样 3012
    getSend3012() {
      let data = {
        pointId: this.monitor.pointId,
        divisorId: this.formValidate10.pollCode
      };
      this.$api.monitor
        .getSend3012(data)
        .then(res => {
          if (res.data.state == 0) {
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate10"].resetFields();
        });
    },
    //提取污染物历史数据 2051
    getReissue() {
      let data = {
        beginTime: this.formValidate9.time[0].format("YYYY-MM-DD HH:mm:ss"),
        cn: this.formValidate9.timetype,
        endTime: this.formValidate9.time[1].format("YYYY-MM-DD HH:mm:ss"),
        pointId: this.monitor.pointId
      };
      this.$api.monitor
        .getReissue(data)
        .then(res => {
          if (res.data.state == 0) {
            // this.$message.success("提取成功");
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 6000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate9"].resetFields();
          // this.$emit("cancel");
        });
    },
    //设置现场机时间 1012
    getSend1012() {
      let data = {
        pointId: this.monitor.pointId,
        divisorId:
          this.formValidate2.pollCode == "数采仪"
            ? ""
            : this.formValidate2.pollCode,
        time: this.formValidate2.time.format("YYYY-MM-DD HH:mm:ss")
      };
      this.$api.monitor
        .getSend1012(data)
        .then(res => {
          if (res.data.state == 0) {
            // this.$message.success("设置成功");
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate2"].resetFields();
          // this.$emit("cancel");
        });
    },
    //现场机时间提取 1011
    getSend1011() {
      let data = {
        pointId: this.monitor.pointId,
        divisorId:
          this.formValidate2.pollCode == "数采仪"
            ? ""
            : this.formValidate2.pollCode
      };
      this.$api.monitor
        .getSend1011(data)
        .then(res => {
          if (res.data.state == 0) {
            if (res.data.data && res.data.data != "") {
              this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
            }
          }
        })
        .finally(() => {
          this.$refs["formValidate2"].resetFields();
          // this.$emit("cancel");
        });
    },
    getPollCodeList() {
      let data = this.monitor.pointId;
      this.$api.monitor.getPollCodeList(data).then(res => {
        this.divisorList = res.data.data;
      });
    },
    // 弹窗取消
    onCancel() {
      if (this.spinning) {
        return false;
      }
      this.$emit("cancel");
    },
    // 弹窗确认
    define() {
      if (this.spinning) {
        return false;
      }
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
          if (_formIndex == 2) {
            if (this.monitor.command == "1011") {
              this.getSend1011();
            } else if (this.monitor.command == "1012") {
              this.getSend1012();
            }
          } else if (_formIndex == 9) {
            this.getReissue();
          } else if (_formIndex == 10) {
            if (this.monitor.command == "3012") {
              this.getSend3012();
            } else if (this.monitor.command == "3013") {
              this.getSend3013();
            }
          } else if (_formIndex == 15) {
            if (this.monitor.command == "3016") {
              this.getSend3016();
            } else if (this.monitor.command == "3017") {
              this.getSend3017();
            }
          }
        } else {
          return false;
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
