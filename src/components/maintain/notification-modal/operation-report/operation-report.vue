<template>
  <div>
    <a-card>
      <div class="card-header">
        <div class="title">运维报表</div>
      </div>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <span class="num">{{ count.taskTotal }}</span>
          <p>运维任务</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#4caf50'">{{ count.taskOffCount }}</span>
          <p>已完成</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#f44336'">{{
            count.taskUnfinishedCount
          }}</span>
          <p>未完成</p>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="+count.taskOffRate">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>任务完成率</p>
            </template>
          </a-progress>
        </a-col>
      </a-row>
      <a-divider dashed />
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4" v-for="(item, index) of taskList" :key="index">
          <a-statistic :title="item.name" :value="item.number" />
        </a-col>
      </a-row>
      <a-divider dashed>运维统计</a-divider>
      <ve-line
        :data="listData"
        :settings="chartSettings"
        :data-empty="true"
        v-if="listData.rows.length != 0"
      ></ve-line>
      <a-empty v-else :image="simpleImage" />
      <a-divider dashed>运维详情</a-divider>
      <a-tabs defaultActiveKey="1" @change="slectDetail">
        <a-tab-pane tab="已完成任务" key="1">
          <mission-finished ref="missionFinished" />
        </a-tab-pane>
        <a-tab-pane tab="未完成任务" key="2" forceRender>
          <mission-unfinished ref="missionUnfinished" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import missionFinished from "./detail/mission-finished";
import missionUnfinished from "./detail/mission-unfinished";

export default {
  components: { missionFinished, missionUnfinished },
  data() {
    this.chartSettings = {
      labelMap: {
        gmtEnd: "日期",
        finishNumber: "已完成",
        unfinishNumber: "未完成",
        percent: "完成率"
      },
      axisSite: { right: ["完成率"] },
      yAxisName: ["完成数", "完成率"],
      yAxisType: ["normal", "percent"],
      stack: { 任务: ["已完成", "未完成"] }
    };
    return {
      count: "",
      taskList: "", //运维项
      listData: {
        columns: ["gmtEnd", "finishNumber", "unfinishNumber", "percent"],
        rows: [
          // { 日期: "2020-5-1", 已完成: 4593, 未完成: 4293, 完成率: 0.78 }
        ]
      }
    };
  },
  methods: {
    slectDetail(e) {
      if (e == 1) {
        this.getReportPushDetailsCurve();
        this.getReportPushTaskCount();
        this.$refs.missionFinished.getTableData();
      } else {
        this.$refs.missionUnfinished.getTableData();
      }
    },
    getTableData() {
      this.slectDetail(1);
    },
    getReportPushDetailsCurve() {
      //根据reportPushId查询任务曲线图数据
      let params = {
        reportPushId: this.$bus.$data.notification.id
      };
      this.$api.maintain.getReportPushDetailsCurve(params).then(res => {
        if (res.data.state == 0) {
          console.log("曲线图", res.data.data);
          let list = this.formatData(res.data.data);
          this.listData.rows = this.formatDataType(list);
        }
      });
    },
    getReportPushTaskCount() {
      //查询报表任务详情
      let params = {
        reportPushId: this.$bus.$data.notification.id
      };
      this.$api.maintain.getReportPushTaskCount(params).then(res => {
        if (res.data.state == 0) {
          this.count = res.data.data;
          this.taskList = res.data.data.stat;
        }
      });
    },
    formatData(data) {
      //整理出相同天的数据
      let listData = [];
      data.forEach(item => {
        let template = {
          gmtEnd: "",
          list: []
        };
        let index = listData.findIndex(listItem => {
          return (
            this.$moment(item.gmtEnd).format("YYYY-MM-DD") ==
            this.$moment(listItem.gmtEnd).format("YYYY-MM-DD")
          );
        });

        if (index == -1) {
          template.gmtEnd = this.$moment(item.gmtEnd).format("YYYY-MM-DD");
          template.list = [item];
          listData.push(template);
        } else {
          listData[index].list.push(item);
        }
      });
      return listData;
    },
    formatDataType(data) {
      //整理出当天的未完成数，已完成数，完成率
      let listData = data.map(item => {
        let obj = {
          gmtEnd: item.gmtEnd,
          finishNumber: 0, //已完成数
          unfinishNumber: 0, //未完成数
          percent: ""
        };
        item.list.forEach(listItem => {
          if (listItem.status == 1) {
            obj.finishNumber++;
          } else {
            obj.unfinishNumber++;
          }
          obj.percent =
            obj.finishNumber /
            (obj.finishNumber + obj.unfinishNumber).toFixed(3); //完成率
        });
        return obj;
      });
      return listData;
    }
  }
};
</script>
