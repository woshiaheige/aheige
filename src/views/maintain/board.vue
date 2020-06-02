<template>
  <div>
    <a-card :bordered="false">
      <a-calendar
        @select="selectCalendar"
        v-model="nowDay"
        @panelChange="panelChange"
      >
        <ul
          class="events"
          slot="dateCellRender"
          slot-scope="value"
          v-if="planList.length != 0"
        >
          <div
            v-for="item in getListCount(value)"
            :key="item.gmt_execution"
            class="count"
          >
            <a-tag color="#87d068">任务:{{ item.task_count }}</a-tag>
            <a-tag color="#87d068">站点:{{ item.point_count }}</a-tag>
          </div>
          <li v-for="(item, index) in getListData(value)" :key="index">
            <a-popover
              @click="getDetail(item)"
              trigger="click"
              placement="leftTop"
            >
              <template slot="content">
                <P v-for="(value, key) of taskList" :key="key"
                  >站点名称：{{ value.pointName }}&nbsp;&nbsp; 运维小组：{{
                    value.groupName
                  }}&nbsp;&nbsp; 运维方案：{{ value.programmeName }}
                </P>
              </template>
              <a-tag color="#2db7f5" v-margin="5">{{
                item.enterpriseName
              }}</a-tag>
            </a-popover>
          </li>
        </ul>
        <!-- 月看板 -->
        <template
          slot="monthCellRender"
          slot-scope="value"
          v-if="monthList.length != 0"
        >
          <div class="notes-month">
            <span></span
            >{{
              getMonthData(value).count
                ? `任务数：${getMonthData(value).count}`
                : ""
            }}
            <div>
              {{
                getMonthData(value).pointCount
                  ? `站点数：${getMonthData(value).pointCount}`
                  : ""
              }}
            </div>
          </div>
        </template>
      </a-calendar>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      nowDay: this.$moment(),
      planList: [], //计划
      planListCount: [], //计划统计数
      taskList: [], //任务
      monthList: [] //月数量统计
    };
  },
  watch: {
    nowDay: {
      handler: "getMonthPlanBoard",
      immediate: true
    }
  },
  methods: {
    selectCalendar(e) {
      console.log(e);
    },
    panelChange(time) {
      //面板改变
      let params = {
        year: time.format("YYYY")
      };
      this.$api.maintain.getCountPlanTask(params).then(res => {
        if (res.data.state == 0) {
          this.monthList = res.data.data;
        }
      });
    },
    getListData(value) {
      let listData = [];
      this.planList.forEach(item => {
        if (
          this.$moment(item.gmtExecution).format("YYYY") == value.year() &&
          this.$moment(item.gmtExecution).format("DD") == value.date() &&
          this.$moment(item.gmtExecution).format("M") == value.month() + 1
        ) {
          listData.push(item);
        }
      });
      return listData || [];
    },
    getListCount(value) {
      let listData = [];
      this.planListCount.forEach(item => {
        if (
          this.$moment(item.gmt_execution).format("YYYY") == value.year() &&
          this.$moment(item.gmt_execution).format("DD") == value.date() &&
          this.$moment(item.gmt_execution).format("M") == value.month() + 1
        ) {
          listData.push(item);
        }
      });
      return listData || [];
    },
    getMonthPlanBoard(time) {
      //获取当月计划
      let params = {
        year: time.format("YYYY"),
        month: time.format("M")
      };
      this.$api.maintain.getMonthPlanBoard(params).then(res => {
        if (res.data.state == 0) {
          this.planList = res.data.data.PlanBoardDataVo;
          this.planListCount = res.data.data.pointAndTaskCount; //当天的站点统计数
        }
      });
    },
    getDetail(item) {
      //获取日计划详情
      let params = {
        enterpriseId: item.enterpriseId,
        beginTime: this.$moment(item.gmtExecution).format("YYYY-MM-DD")
      };
      this.$api.maintain.getMonthPlanBoardData(params).then(res => {
        if (res.data.state == 0) {
          this.taskList = res.data.data;
        }
      });
    },
    getMonthData(value) {
      let count;
      this.monthList.forEach(item => {
        if (
          this.$moment(item.gmtExecution1).format("YYYY") == value.year() &&
          this.$moment(item.gmtExecution1).format("MM") == value.month() + 1
        ) {
          count = item;
        }
      });
      return count || {};
    },
    // getMonthData(value) {
    //   if (value.month() === 8) {
    //     return 1394;
    //   }
    // },
    getCountPlanTask() {
      this.$api.getCountPlanTask();
    }
  }
};
</script>

<style lang="less" scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}

.count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // font-size: 16px;
  // font-weight: 600;
  // color: red;
}
</style>
