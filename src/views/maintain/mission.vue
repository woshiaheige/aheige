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
      size="middle"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      :loading="loading"
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
      size="small"
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :defaultPageSize="pageSize"
      :total="total"
    />
    <!--新增-->
    <add-edit
      :visible="show"
      :planList="planList"
      :stationList="stationList"
      @cancel="cancel"
    ></add-edit>
    <!--延期-->
    <delay-modal :visible="delayShow" @cancel="cancel"></delay-modal>
    <!--关闭-->
    <close-modal :visible="closeShow" @cancel="cancel"></close-modal>
    <!--详情-->
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
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "任务名称（编号）",
          dataIndex: "name"
        },
        {
          title: "站点",
          dataIndex: "station"
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName"
        },
        {
          title: "任务状态",
          dataIndex: "status",
          customRender: text => {
            if (text == 1) {
              return "已创建";
            } else if (text == 2) {
              return "处理中";
            } else if (text == 3) {
              return "已完成";
            } else if (text == 4) {
              return "已延期";
            } else if (text == 5) {
              return "已关闭";
            }
          }
        },
        {
          title: "运维小组",
          dataIndex: "groupName"
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
      stationList: [],
      planList: [],
      show: false,
      delayShow: false,
      closeShow: false,
      detailShow: false
    };
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        pointId: "",
        state: ""
      };
      this.loading = true;
      this.$api.maintain
        .getManageTaskList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = Number(res.data.data.total);
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    cancel(value) {
      this.show = value;
      this.delayShow = value;
      this.closeShow = value;
      this.detailShow = value;
      this.getTableData();
    },
    getStation() {
      this.$api.common.selectStation().then(res => {
        if (res.data.state == 0) {
          this.stationList = res.data.data;
        }
      });
    },
    getPlan() {
      this.$api.common.selectPlan().then(res => {
        if (res.data.state == 0) {
          this.planList = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getStation();
    this.getPlan();
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
