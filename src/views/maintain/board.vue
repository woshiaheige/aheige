<template>
  <div>
    <a-card :bordered="false">
      <a-calendar>
        <ul class="events" slot="dateCellRender" slot-scope="value">
          <li v-for="item in getListData(value)" :key="item.content">
            <a-popover>
              <template slot="content">
                <P>{{ item.content }}</P>
              </template>
              <a-badge
                :status="item.type"
                :text="item.plan"
                :title="item.plan"
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
      listDetail: ""
    };
  },
  methods: {
    getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            {
              plan: "计划A",
              type: "default",
              content:
                "广州市污水处理厂-废水排口 运维1组-张天志 运维任务：日常巡检"
            },
            {
              type: "success",
              plan: "计划B",
              content:
                "佛山市污水处理厂-废水排口 运维2组-陈森 运维任务：日常巡检"
            }
          ];
          break;
        case 10:
          listData = [
            {
              type: "default",
              plan: "计划C",
              content:
                "佛山市污水处理厂-废水排口 运维2组-陈森 运维任务：日常巡检"
            },
            {
              type: "success",
              plan: "计划D",
              content:
                "惠州市污水处理厂-废水排口 运维1组-张天志 运维任务：日常巡检"
            }
          ];
          break;
        case 15:
          listData = [
            {
              type: "default",
              content:
                "佛山市污水处理厂-废水排口 运维2组-陈森 运维任务：日常巡检"
            },
            {
              type: "success",
              content:
                "广州市污水处理厂-废水排口 运维1组-张天志 运维任务：日常巡检"
            }
          ];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
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
