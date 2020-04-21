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
      <a-descriptions
        title="宏恒公司周报表"
        layout="vertical"
        bordered
        size="small"
      >
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
                <span slot="title">{{ item.pointName }}</span>
                <div slot="description">
                  <p>
                    {{ item.group }}-{{ item.personnel }} 运维任务：{{
                      item.content
                    }}
                  </p>
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
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    }
  }
};
</script>

<style></style>
