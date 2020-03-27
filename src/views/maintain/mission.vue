<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title">任务一览</span>
    <a-form layout="inline">
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="show = true">
          突发任务
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      v-margin:top="16"
    >
      <span slot="action">
        <a @click="delayShow = true">申请延期</a>
        <a-divider type="vertical" />
        <a @click="closeShow = true">任务关闭</a>
      </span>
      <a slot="check">
        <a @click="detailShow = true">详情</a>
        <a-divider type="vertical" />
        <a>报告</a>
      </a>
    </a-table>
    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :visible="show" @cancel="cancel"></add-edit>
    <delay-modal :visible="delayShow" @cancel="cancel"></delay-modal>
    <close-modal :visible="closeShow" @cancel="cancel"></close-modal>
    <detail-modal
      :visible="detailShow"
      :tableData="tableData"
      @cancel="cancel"
    ></detail-modal>
  </a-card>
</template>
<script>
import addEdit from "@/components/maintain/mission/add-edit";
import detailModal from "@/components/maintain/mission/detail";
import delayModal from "@/components/maintain/mission/delay";
import closeModal from "@/components/maintain/mission/close";
export default {
  components: { addEdit, delayModal, closeModal, detailModal },
  data() {
    return {
      current: 1,
      total: 0,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "任务名称（编号）",
          dataIndex: "title"
        },
        {
          title: "站点",
          dataIndex: "station"
        },
        {
          title: "企业名称",
          dataIndex: "company"
        },
        {
          title: "任务状态",
          dataIndex: "status"
        },
        {
          title: "运维小组",
          dataIndex: "team"
        },
        {
          title: "任务时间",
          dataIndex: "time"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "查看",
          key: "check",
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: [],
      show: false,
      delayShow: false,
      closeShow: false,
      detailShow: false
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getMissionList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    cancel(value) {
      this.show = value;
      this.delayShow = value;
      this.closeShow = value;
      this.detailShow = value;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
