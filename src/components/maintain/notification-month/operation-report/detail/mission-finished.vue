<template>
  <div>
    <a-empty v-if="notificationData.length == 0" />
    <a-descriptions layout="vertical" bordered size="small" v-else>
      <a-descriptions-item
        :span="3"
        v-for="item in notificationData"
        :key="item.dateTime"
      >
        <template>
          <span slot="label">{{ item.dateLabel }}</span>
          <a-list
            itemLayout="horizontal"
            :dataSource="item.taskList"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <span slot="title"
                  >{{ item.handleName }}（{{ item.groupName }}）</span
                >
                <div slot="description">
                  <p>运维任务：{{ item.taskName }}</p>
                </div>
              </a-list-item-meta>
              <div>{{ item.gmtEnd }}</div>
            </a-list-item>
          </a-list>
        </template>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pointId: "",
      notificationData: []
    };
  },
  methods: {
    getTableData() {
      // this.$api.maintain
      //   .getReportPushDetails({ reportPushId: this.pointId })
      //   .then(res => {
      //     if (res.data.state == 0) {
      //       this.notificationData = this.detailFilter(res.data.data);
      //     }
      //   });
      this.notificationData = [
        {
          dateLabel: "第一周",
          taskList: [
            {
              handleName: "张山",
              groupName: "小组A",
              taskName: "日常巡查",
              gmtEnd: "2020-4-25 15:32:32"
            }
          ]
        }
      ];
    },
    detailFilter(data) {
      //过滤和整理日期
      let list = [
        { dateLabel: "星期一", week: 1, taskList: [] },
        { dateLabel: "星期二", week: 2, taskList: [] },
        { dateLabel: "星期三", week: 3, taskList: [] },
        { dateLabel: "星期四", week: 4, taskList: [] },
        { dateLabel: "星期五", week: 5, taskList: [] },
        { dateLabel: "星期六", week: 6, taskList: [] },
        { dateLabel: "星期天", week: 0, taskList: [] }
      ];
      data.forEach(item => {
        list.forEach(list => {
          if (this.$moment(item.gmtEnd).day() == list.week) {
            list.taskList.push(item);
          }
        });
      });
      list = list.filter(item => {
        return item.taskList.length != 0;
      });
      return list;
    }
  }
};
</script>
