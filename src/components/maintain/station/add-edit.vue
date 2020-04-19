<template>
  <a-modal
    title="任务详细信息"
    v-model="status"
    @cancel="handleCancel"
    :width="900"
    class="maintain-modal"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>
    <div class="mission-detail">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="基本信息" key="1">
          <info-modal></info-modal>
        </a-tab-pane>
        <a-tab-pane tab="任务项" key="2"><info-modal></info-modal></a-tab-pane>
        <a-tab-pane tab="任务报告" key="3">
          <a-table
            size="middle"
            :columns="columns"
            :dataSource="tableData"
            :pagination="false"
            :scroll="{ y: 360 }"
            v-margin:top="16"
          >
            <a slot="check">
              <a>报告</a>
            </a>
          </a-table>
          <a-button key="back" v-margin:top="15">重新生成报告</a-button>
        </a-tab-pane>
      </a-tabs>
      <div class="list">
        <p>任务历史</p>
        <a-list itemLayout="horizontal" :dataSource="listData">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.desc">
              <a slot="title">{{ item.title }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </a-modal>
</template>
<script>
import infoModal from "./info";
export default {
  components: { infoModal },
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    tableData: Array
  },
  data() {
    return {
      listData: [
        {
          title: "2020-03-20 08:00:23",
          desc: "李小龙，完成任务1"
        },
        {
          title: "2020-03-21 10:00:23",
          desc: "李小龙，新建任务2"
        },
        {
          title: "2020-03-22 12:00:23",
          desc: "李小龙，完成任务2"
        },
        {
          title: "2020-03-23 14:00:23",
          desc: "李小龙，新建任务3"
        }
      ],
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`,
          width: 80
        },
        {
          title: "报告标题",
          dataIndex: "title",
          ellipsis: true
        },
        {
          title: "状态",
          dataIndex: "status",
          width: 80
        },
        {
          title: "查看",
          key: "check",
          scopedSlots: { customRender: "check" },
          width: 80
        }
      ]
      // tableData: []
    };
  },
  computed: {
    status: {
      get() {
        return this.visible;
      },
      set() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel", false);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
