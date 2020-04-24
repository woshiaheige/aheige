<template>
  <div>
    <a-card :bordered="false">
      <a-calendar @select="selectCalendar" v-model="nowDay">
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
                  {{ value.groupName }}-{{ value.userName }}
                </P>
              </template>
              <a-badge
                :status="'default'"
                :text="item.name"
                :title="item.name"
              />
            </a-popover>
          </li>
        </ul>
        <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{ getMonthData(value) }}</section>
            <span>Backlog number</span>
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
      taskList: [] //任务
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
    getListData(value) {
      let listData = [];
      this.planList.forEach(item => {
        if (this.$moment(item.gmtExecution).format("DD") == value.date()) {
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
          console.log(res.data.data);
        }
      });
    },
    getDetail(item) {
      //获取计划详情
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
      if (value.month() === 8) {
        return 1394;
      }
    }
  },
  mounted() {
    // console.log(this.nowDay.format("YYYY"), this.nowDay.format("MM"));
    // this.getMonthPlanBoard();
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
