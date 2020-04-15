<template>
  <a-card :bordered="false" class="operation-log" title="运维记录报告">
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="logReport(row)">报告</a>
        <a-divider type="vertical" />
        <a @click="logView(row)">查看</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <detail-modal
      :visible="detailShow"
      :tableData="missonDetail"
      @cancel="cancel"
    ></detail-modal>
  </a-card>
</template>

<script>
import detailModal from "@/components/maintain/mission/detail";
export default {
  components: { detailModal },
  data() {
    return {
      current: 1,
      total: 1,
      detailShow: false,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "任务名称（编号）",
          dataIndex: "mission",
          key: "mission"
        },
        {
          title: "站点",
          dataIndex: "station",
          key: "station"
        },
        {
          title: "企业名称",
          dataIndex: "enterprise",
          key: "enterprise"
        },
        {
          title: "仪器",
          dataIndex: "instrument",
          key: "instrument"
        },
        {
          title: "运维小组",
          dataIndex: "group",
          key: "group"
        },
        {
          title: "签名确认",
          dataIndex: "signature",
          key: "signature"
        },
        {
          title: "任务时间",
          dataIndex: "missionTime",
          key: "missionTime"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          mission: "可口可乐（污水）自动运维任务20/02/13（#1879",
          station: "可口可乐（污水",
          enterprise: "可口可乐佛山有限公司",
          instrument: "仪器A",
          group: "运维小组A",
          signature: "未确认",
          missionTime: "2019-10-15"
        }
      ],
      missonDetail: [] //详情的数据
    };
  },
  methods: {
    logReport() {
      this.roportVisible = true;
    },
    logView() {
      this.detailShow = true;
    },
    getMissonDetail() {
      this.$api.maintain.getMissionList().then(res => {
        this.missonDetail = res.data.data;
      });
    },
    cancel(value) {
      this.detailShow = value;
    }
  },
  mounted() {
    this.getMissonDetail();
  }
};
</script>
