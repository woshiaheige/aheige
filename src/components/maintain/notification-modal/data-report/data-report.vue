<template>
  <div>
    <a-card>
      <div class="card-header">
        <div class="title">数据报表</div>
      </div>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <span class="num" v-color="'#f44336'">{{
            count.overProofCount ? count.overProofCount : 0
          }}</span>
          <p>超标次数</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#ff9800'">{{
            count.anomalyCount ? count.anomalyCount : 0
          }}</span>
          <p>异常次数</p>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="+count.minPro">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>分钟数据完整率</p>
            </template>
          </a-progress>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="+count.hourPro">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>小时数据完整率</p>
            </template>
          </a-progress>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="+count.dayPro">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>日数据完整率</p>
            </template>
          </a-progress>
        </a-col>
      </a-row>
      <a-divider dashed>数据统计</a-divider>
      <ve-line
        :data="listData"
        :settings="chartSettings"
        :data-empty="true"
        v-if="listData.rows.length != 0"
      ></ve-line>
      <a-empty v-else :image="simpleImage" />
      <a-divider dashed>数据详情</a-divider>
      <a-tabs defaultActiveKey="1" @change="slectDetail">
        <a-tab-pane tab="超标详情" key="1">
          <detail-exceed ref="exceed" />
        </a-tab-pane>
        <a-tab-pane tab="异常详情" key="2" forceRender>
          <detail-unusual ref="unusual" />
        </a-tab-pane>
        <a-tab-pane tab="数据完整率" key="3" forceRender>
          <detail-integrity ref="integrity" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import detailExceed from "./detail/detail-exceed";
import detailUnusual from "./detail/detail-unusual.vue";
import detailIntegrity from "./detail/detail-integrity.vue";
import { Empty } from "ant-design-vue";
export default {
  components: { detailExceed, detailUnusual, detailIntegrity },
  data() {
    this.chartSettings = {
      yAxisName: ["次数"],
      labelMap: {
        dateTime: "日期",
        exceedNumber: "超标次数",
        unusualNumber: "异常次数"
      }
    };
    return {
      obj: {},
      count: "", //统计信息
      listData: {
        columns: ["dateTime", "exceedNumber", "unusualNumber"],
        rows: [
          // { 日期: "2020-5-1", 超标次数: 13, 异常次数: 10 }
        ]
      }
    };
  },
  methods: {
    slectDetail(e) {
      if (e == 1) {
        this.getReportPushDataRateDetails();
        this.getReportPushDataRateWarnAndOverProofCurve();
        this.$refs.exceed.getTableData();
      } else if (e == 2) {
        this.$refs.unusual.getTableData();
      } else if (e == 3) {
        this.$refs.integrity.getTableData();
      }
    },
    getTableData() {
      this.slectDetail(1);
    },
    getReportPushDataRateDetails() {
      //获取统计信息
      let notification = this.$bus.$data.notification;
      let params = {
        beginTime: notification.beginTime,
        endTime: notification.endTime,
        pointId: notification.pointId
      };
      this.$api.maintain.getReportPushDataRateDetails(params).then(res => {
        if (res.data.state == 0) {
          this.count = res.data.data ? res.data.data : {};
        }
      });
    },
    getReportPushDataRateWarnAndOverProofCurve() {
      //根据监测点获取季度/月/周的超标、异常曲线图数据
      let notification = this.$bus.$data.notification;
      let params = {
        beginTime: notification.beginTime,
        endTime: notification.endTime,
        mn: notification.mn
      };
      this.$api.maintain
        .getReportPushDataRateWarnAndOverProofCurve(params)
        .then(res => {
          if (res.data.state == 0) {
            let data = res.data.data;
            let exMapList = data.exMapList.map(item => {
              item.status = "1"; //超标
              return item;
            });
            let warnMapList = data.warnMapList.map(item => {
              item.status = "2"; //异常
              return item;
            });
            let list = this.formatData([...exMapList, ...warnMapList]);
            this.listData.rows = this.formatDataType(list);
          }
        });
    },
    formatData(data) {
      //整理出相同天的数据
      let listData = [];
      data.forEach(item => {
        let template = {
          dateTime: "",
          list: []
        };
        let index = listData.findIndex(listItem => {
          return (
            this.$moment(item.dateTime).format("YYYY-MM-DD") ==
            this.$moment(listItem.dateTime).format("YYYY-MM-DD")
          );
        });

        if (index == -1) {
          template.dateTime = this.$moment(item.dateTime).format("YYYY-MM-DD");
          template.list = [item];
          listData.push(template);
        } else {
          listData[index].list.push(item);
        }
      });
      return listData;
    },
    formatDataType(data) {
      //整理出当天的超标数，异常数
      let listData = data.map(item => {
        let obj = {
          dateTime: item.dateTime,
          exceedNumber: 0, //异常数
          unusualNumber: 0 //超标数
        };
        item.list.forEach(listItem => {
          if (listItem.status == 1) {
            obj.exceedNumber++;
          } else {
            obj.unusualNumber++;
          }
        });
        return obj;
      });
      return listData;
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  }
};
</script>
