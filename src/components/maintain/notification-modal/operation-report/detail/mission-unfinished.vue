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
      //       this.notificationData =res.data.data;
      //     }
      //   });
      this.notificationData = [
        {
          dateLabel: "2020-5-1",
          taskList: [
            {
              handleName: "张山",
              groupName: "小组A",
              taskName: "日常巡查",
              gmtEnd: "2020-5-1"
            }
          ]
        }
      ];
    }
  }
};
</script>
