<template>
  <div>
    <a-modal
      :bodyStyle="{ maxHeight: '700px', overflow: 'auto' }"
      :visible="visible"
      title="查看报表"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="900"
    >
      <a-card v-margin:bottom="16">
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
      </a-card>
      <a-descriptions title="排水口" layout="vertical" bordered size="small">
        <a-descriptions-item
          :span="3"
          v-for="item in notificationData"
          :key="item.dateTime"
        >
          <span slot="label">{{ item.dateLabel }}</span>
          <a-list
            itemLayout="horizontal"
            :dataSource="item.taskList"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <span slot="title"
                  >{{ item.personnel }}（{{ item.group }}）</span
                >
                <div slot="description">
                  <p>运维任务：{{ item.content }}</p>
                </div>
              </a-list-item-meta>
              <div>{{ item.dateTime }}</div>
            </a-list-item>
          </a-list>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
export default {
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
        this.getReportPushDetails();
      }
    }
  },
  data() {
    return {
      loading: false,
      notification: {
        id: "",
        beginTime: "",
        endTime: ""
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
      tableData: [
        {
          poiName: "756877X5555553",
          mn: "756877X5555553",
          enterpriseName: "东莞利来远东针织有限公司",
          dayRealCount: "0",
          dayOughtCount: "1",
          dayPro: "0.00%",
          hourRealCount: "0",
          hourOughtCount: "17",
          hourPro: "0.00%",
          minRealCount: "0",
          minOughtCount: "102",
          minPro: "0.00%",
          dataTime: "2020-04-22~2020-04-23"
        }
      ],
      notificationData: [
        {
          dateLabel: "星期一",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            },
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        },
        {
          dateLabel: "星期二",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        },
        {
          dateLabel: "星期三",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        },
        {
          dateLabel: "星期四",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        },
        {
          dateLabel: "星期五",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        },
        {
          dateLabel: "星期六",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        },
        {
          dateLabel: "星期日",
          taskList: [
            {
              personnel: "张天志",
              group: "运维一组",
              content: "日常巡检",
              pointName: "废水排口",
              dateTime: "2020-04-21 10:00:00"
            }
          ]
        }
      ]
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
            this.reportDetail = this.detailFilter(res.data.data);
          }
        });
    },
    detailFilter(data) {
      let list = [];
      list = data.map(item => {
        return {
          dateLabel: item.gmtEnd
            ? this.$moment(item.gmtEnd).format("dddd")
            : "",
          taskList: { ...item }
        };
      });
      return list;
    },
    getReportPushDataRateDetails() {
      let params = {
        beginTime: this.notification.beginTime,
        endTime: this.notification.endTime
      };
      this.$api.maintain.getReportPushDataRateDetails(params).then(res => {
        if (res.data.state == 0) {
          this.tableData = res.data.data;
        }
      });
    }
  }
};
</script>

<style></style>
