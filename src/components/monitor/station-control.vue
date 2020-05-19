<template>
  <div class="monitor">
    <a-modal
      :width="800"
      title="设备反控"
      :visible="visible"
      @ok="handleOk"
      @cancel="onCancel"
      :maskClosable="false"
    >
      <a-tabs type="card" :animated="true">
        <a-tab-pane tab="设备反控" key="1"
          ><a-row>
            <a-col :span="8" style="text-align: center;">
              <p class="control-title">即时采样(仪表)</p>
              <img
                v-lazy="controlImg"
                class="control-img"
                style="width: 100px; height: 100px; margin: 0 auto"
              />
              <p>
                <a-button-group>
                  <a-button
                    @click="
                      showModal({
                        title: '即时采样(仪表)',
                        command: '3012',
                        operate: '设置',
                        formIndex: '11'
                      })
                    "
                    >设置</a-button
                  >
                </a-button-group>
              </p></a-col
            >

            <a-col :span="8" style="text-align: center;"
              ><p class="control-title">启动清洗(仪表)</p>
              <img
                v-lazy="controlImg"
                class="control-img"
                style="width: 100px; height: 100px; margin: 0 auto"
              />
              <p>
                <a-button-group>
                  <a-button
                    @click="
                      showModal({
                        title: '启动清洗(仪表)',
                        command: '3013',
                        operate: '设置',
                        formIndex: '12'
                      })
                    "
                    >设置</a-button
                  >
                </a-button-group>
              </p></a-col
            >
            <a-col :span="8" style="text-align: center;"
              ><p class="control-title">启动超标留样(仪表)</p>
              <img
                v-lazy="controlImg"
                class="control-img"
                style="width: 100px; height: 100px; margin: 0 auto"
              />
              <p>
                <a-button-group>
                  <a-button @click="getSend3015" :loading="loading"
                    >设置</a-button
                  >
                </a-button-group>
              </p></a-col
            >
          </a-row></a-tab-pane
        >
        <a-tab-pane tab="数采仪反控" key="2"
          ><a-row>
            <a-col :span="8" style="text-align: center;"
              ><p class="control-title">现场机时间</p>
              <img
                v-lazy="controlImg"
                class="control-img"
                style="width: 100px; height: 100px; margin: 0 auto"
              />
              <p>
                <a-button-group>
                  <a-button
                    @click="
                      showModal({
                        title: '现场机时间',
                        command: '1012',
                        operate: '设置',
                        formIndex: '2'
                      })
                    "
                    >设置</a-button
                  >
                  <a-button
                    @click="
                      showModal({
                        title: '现场机时间',
                        command: '1011',
                        operate: '提取',
                        formIndex: '2'
                      })
                    "
                    >提取</a-button
                  >
                </a-button-group>
              </p></a-col
            >
            <a-col :span="8" style="text-align: center;"
              ><p class="control-title">污染物历史数据</p>
              <img
                v-lazy="controlImg"
                class="control-img"
                style="width: 100px; height: 100px; margin: 0 auto"
              />
              <p>
                <a-button-group>
                  <a-button
                    @click="
                      showModal({
                        title: '污染物历史数据',
                        command: '2051',
                        operate: '提取',
                        formIndex: '9'
                      })
                    "
                    >提取</a-button
                  >
                </a-button-group>
              </p></a-col
            >
            <a-col :span="8" style="text-align: center;"
              ><p class="control-title">采样时间周期(仪表)</p>
              <img
                v-lazy="controlImg"
                class="control-img"
                style="width: 100px; height: 100px; margin: 0 auto"
              />
              <p>
                <a-button-group>
                  <a-button
                    @click="
                      showModal({
                        title: '采样时间周期(仪表)',
                        command: '3016',
                        operate: '设置',
                        formIndex: '15'
                      })
                    "
                    >设置</a-button
                  >
                  <a-button
                    @click="
                      showModal({
                        title: '采样时间周期(仪表)',
                        command: '3017',
                        operate: '提取',
                        formIndex: '15'
                      })
                    "
                    >提取</a-button
                  >
                </a-button-group>
              </p></a-col
            >
          </a-row></a-tab-pane
        >
      </a-tabs>
      <template slot="footer">
        <a-button type="primary" @click="onCancel">关闭</a-button>
      </template>
      <monitor-modal
        :modalObj="controlObj"
        :visible="subVisible"
        @addSuccessful="returnMsg"
        @cancel="onCancelSub"
      ></monitor-modal>
    </a-modal>
  </div>
</template>

<script>
import monitorModal from "@/components/monitor/station-control-modal.vue";
import controlImg from "@/assets/img/monitor.png";
export default {
  components: { monitorModal },
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
      loading: false,
      try: 0,
      timeLength: 3000,
      subVisible: false,
      controlImg,
      controlObj: {},
      data1: [],
      dataType: "监测数据",
      timeType: "小时",
      formData: {
        title: "",
        enterprise: "",
        type: "",
        status: ""
      },
      columns1: [
        {
          title: "序号",
          width: 80,
          key: "index"
        },
        {
          title: "时间",
          key: "date"
        },
        {
          title: "废气",
          key: "fq"
        }
      ]
    };
  },
  methods: {
    // 根据QN号查询反控结果日志信息
    getResultByQn(qn, command, timeLength) {
      let _this = this;
      _this.timeLength = timeLength;
      _this.$api.monitor.getResultByQn(qn, command).then(rey => {
        this.loading = true;
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
              _this.loading = false;
              this.$notification.error({
                message: "设置失败"
              });
              clearTimeout(timerResult);
            }
          } else if (rey.data.data.status == "1") {
            _this.loading = false;
            // this.$notification.success({
            //   message: "设置成功啦~~"
            // });
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
          } else {
            _this.loading = false;
            this.$notification.error({
              message: "设置失败"
            });
            clearTimeout(timerResult);
          }
        }
      });
    },
    getSend3015() {
      // this.$message.success("设置成功");
      let data = {
        pointId: this.modalObj.pointId
      };
      this.$api.monitor.getSend3015(data).then(res => {
        if (res.data.state == 0) {
          // this.$message.success("设置成功");
          if (res.data.data && res.data.data != "") {
            this.getResultByQn(res.data.data.qn, res.data.data.command, 3000);
          }
        }
      });
    },
    //关闭子级事件
    onCancelSub() {
      this.subVisible = false;
    },
    //关闭事件
    onCancel() {
      this.$emit("cancel");
    },
    returnMsg(e) {
      console.log(e);
    },
    showModal(obj) {
      const _obj = {};
      this.subVisible = true;
      _obj.title = obj.title;
      _obj.command = obj.command;
      _obj.operate = obj.operate;
      _obj.poiName = this.modalObj.name;
      _obj.pointId = this.modalObj.pointId;
      _obj.formIndex = obj.formIndex;
      this.controlObj = _obj;
    },
    handleOk() {
      this.$emit("cancel");
    },
    handleCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style></style>
