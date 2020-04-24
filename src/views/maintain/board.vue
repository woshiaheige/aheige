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
          <li v-for="(item, index) in getListData(value)" :key="index">
            <a-popover
              @click="getDetail(item)"
              trigger="click"
              placement="leftTop"
            >
              <template slot="content">
                <P v-for="(value, key) of taskList" :key="key"
                  >{{ value.enterpriseName }}-{{ value.pointName }}
                  {{ value.groupName }} 运维方案-{{ value.task }}
                </P>
              </template>
              <a-badge
                v-show="item.status == 1"
                status="default"
                :text="item.name"
                :title="item.name"
              />
              <a-badge
                v-show="item.status == 2"
                status="success"
                :text="item.name"
                :title="item.name"
              />
              <a-badge
                v-show="item.status == 3"
                status="warning"
                :text="item.name"
                :title="item.name"
              />
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
            {{ getMonthData(value).count }}
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
    getMonthPlanBoard(time) {
      //获取当月计划
      let params = {
        year: time.format("YYYY"),
        month: time.format("MM")
      };
      this.$api.maintain.getMonthPlanBoard(params).then(res => {
        if (res.data.state == 0) {
          this.planList = res.data.data;
        }
      });
    },
    getDetail(item) {
      //获取日计划详情
      let params = {
        planId: item.id,
        time: this.$moment(item.gmtExecution).format("YYYY-MM-DD")
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
</style>
