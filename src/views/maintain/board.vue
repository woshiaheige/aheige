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
          <li v-for="item in getListData(value)" :key="item.id">
            <a-popover>
              <template slot="content">
                <P>{{ item.content }}</P>
              </template>
              <!-- <a-badge
                :status="item.type"
                :text="item.plan"
                :title="item.plan"
              /> -->
              <span>{{ item.name }}</span>
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
      initPlanList: [], //初始的任务
      planList: []
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
      let listData;
      this.initPlanList.forEach((item, index) => {
        if (this.$moment(item.gmtExecution).format("M") == value.date()) {
          listData = [JSON.parse(JSON.stringify(item))];
          this.initPlanList.splice(index, 1);
        }
      });

      // switch (value.date()) {
      //   case 8:
      //     listData = [
      //       {
      //         plan: "计划A",
      //         type: "default",
      //         content:
      //           "广州市污水处理厂-废水排口 运维1组-张天志 运维任务：日常巡检"
      //       },
      //       {
      //         type: "success",
      //         plan: "计划B",
      //         content:
      //           "佛山市污水处理厂-废水排口 运维2组-陈森 运维任务：日常巡检"
      //       }
      //     ];
      //     break;
      //   case 10:
      //     listData = [
      //       {
      //         type: "default",
      //         plan: "计划C",
      //         content:
      //           "佛山市污水处理厂-废水排口 运维2组-陈森 运维任务：日常巡检"
      //       },
      //       {
      //         type: "success",
      //         plan: "计划D",
      //         content:
      //           "惠州市污水处理厂-废水排口 运维1组-张天志 运维任务：日常巡检"
      //       }
      //     ];
      //     break;
      //   default:
      // }
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
          this.initPlanList = JSON.parse(JSON.stringify(res.data.data));
          console.log(res.data.data);
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
