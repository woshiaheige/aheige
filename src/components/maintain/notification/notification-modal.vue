<template>
  <div>
    <a-modal
      :bodyStyle="{ maxHeight: '700px', overflow: 'auto' }"
      :visible="visible"
      :title="notification.title"
      :width="900"
      @cancel="handleCancel"
    >
      <a-card v-margin:bottom="16">
        <div class="card-header">
          <div class="title">第N期周报表</div>
          <div>
            <div>
              开始时间：{{
                $moment(notification.beginTime).format("YYYY-MM-DD")
              }}
            </div>
            <div>
              结束时间：{{ $moment(notification.endTime).format("YYYY-MM-DD") }}
            </div>
          </div>
        </div>
        <!-- <a-row
          type="flex"
          justify="center"
          :gutter="16"
          class="notification-tit"
        >
          <a-col>开始时间：{{ notification.beginTime }}</a-col>
          <a-col>结束时间：{{ notification.endTime }}</a-col>
        </a-row> -->

        <notification-exceed v-margin:top="40" :formInline="obj" ref="exceed" />
        <notification-unusual
          v-margin:top="40"
          :formInline="obj"
          ref="unusual"
        />
      </a-card>
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
      <a-table
        :loading="loading"
        size="middle"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
      </a-table>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import notificationExceed from "@/components/maintain/notification/notification-exceed";
import notificationUnusual from "@/components/maintain/notification/notification-unusual";
export default {
  components: { notificationExceed, notificationUnusual },
  props: {
    obj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    visible() {
      return this.obj.show;
    }
  },
  watch: {
    obj(nval) {
      if (nval.show) {
        this.notification = nval;
        this.$nextTick(() => {
          this.$refs.exceed.getTableData(nval);
          this.$refs.unusual.getTableData(nval);
        });
        this.getReportPushDetails();
        this.getReportPushDataRateDetails();
      }
    }
  },
  data() {
    return {
      aaa: "",
      loading: false,
      formInline: { mn: "", beginTime: "", endTime: "" },
      notification: {
        pointId: "",
        beginTime: "",
        endTime: "",
        title: ""
      },
      columns: [
        {
          title: "分钟数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "minOughtCount",
              key: "minOughtCount"
            },
            {
              title: "实收条数",
              dataIndex: "minRealCount",
              key: "minRealCount"
            },
            {
              title: "数据完整率",
              dataIndex: "minPro",
              key: "minPro"
            }
          ]
        },
        {
          title: "小时数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "hourOughtCount",
              key: "hourOughtCount"
            },
            {
              title: "实收条数",
              dataIndex: "hourRealCount",
              key: "hourRealCount"
            },
            {
              title: "数据完整率",
              dataIndex: "hourPro",
              key: "hourPro"
            }
          ]
        },
        {
          title: "日数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "dayOughtCount",
              key: "dayOughtCount"
            },
            {
              title: "实收条数",
              dataIndex: "dayRealCount",
              key: "dayRealCount"
            },
            {
              title: "数据完整率",
              dataIndex: "dayPro",
              key: "dayPro"
            }
          ]
        }
      ],
      tableData: [],
      notificationData: []
    };
  },
  methods: {
    handleOk() {
      this.$emit("cancel");
    },
    handleCancel() {
      this.$emit("cancel");
    },
    getReportPushDetails() {
      //报表详情
      this.$api.maintain
        .getReportPushDetails({ reportPushId: this.notification.id })
        .then(res => {
          if (res.data.state == 0) {
            this.notificationData = this.detailFilter(res.data.data);
          }
        });
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
    },
    getReportPushDataRateDetails() {
      let params = {
        beginTime: this.notification.beginTime,
        endTime: this.notification.endTime,
        pointId: this.notification.pointId
      };
      this.$api.maintain.getReportPushDataRateDetails(params).then(res => {
        if (res.data.state == 0) {
          this.tableData = res.data.data;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style></style>
