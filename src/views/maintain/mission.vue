<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item label="监控点名称">
          <a-input placeholder="请输入"></a-input>
        </a-form-item>
        <!-- <a-form-item label="运维小组">
          <a-select
            defaultValue="all"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="jack">运维1组</a-select-option>
            <a-select-option value="lucy">运维2组</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="任务状态">
          <a-select defaultValue="all" style="width: 120px">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="jack">未完成</a-select-option>
            <a-select-option value="lucy">已完成</a-select-option>
            <a-select-option value="lucy">已逾期</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="任务时间">
          <a-range-picker @change="onChange" />
        </a-form-item> -->
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="maintain" v-margin:top="16">
      <div class="card-header">
        <div class="title">监测点列表</div>
        <!-- <div class="extra">
          <a-button type="primary" html-type="submit" @click="show = true">
            <a-icon type="plus" />突发任务
          </a-button>
        </div> -->
      </div>
      <a-table
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :loading="loading"
        v-margin:top="16"
      >
        <span slot="action" slot-scope="row">
          <!-- <a @click="delayShow = true">申请延期</a>
          <a-divider type="vertical" />
          <a @click="closeShow = true">任务关闭</a> -->
          <a @click="goDetail(row)">详情</a>
        </span>
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
      <!--新建-->
      <!-- <add-edit
        :visible="show"
        :planList="planList"
        :stationList="stationList"
        @cancel="cancel"
      ></add-edit> -->
      <!--延期-->
      <!-- <delay-modal :visible="delayShow" @cancel="cancel"></delay-modal> -->
      <!--关闭-->
      <!-- <close-modal :visible="closeShow" @cancel="cancel"></close-modal> -->
      <!--详情-->
      <!-- <detail-modal
        :visible="detailShow"
        :tableData="tableData"
        @cancel="cancel"
      ></detail-modal> -->
    </a-card>
  </div>
</template>
<script>
// import addEdit from "@/components/maintain/mission/add-edit";
// import detailModal from "@/components/maintain/mission/detail";
// import delayModal from "@/components/maintain/mission/delay";
// import closeModal from "@/components/maintain/mission/close";
export default {
  // components: { addEdit, delayModal, closeModal, detailModal },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      formInline: {
        name: "",
        phone: ""
      },
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName"
        },
        {
          title: "监控点",
          dataIndex: "station"
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
          },
          align: "center",
          width: 150
        },
        {
          title: "任务数量",
          dataIndex: "num"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 100
        }
      ],
      tableData: [
        {
          num: 10
        }
      ],
      stationList: [],
      planList: []
      // show: false,
      // delayShow: false,
      // closeShow: false,
      // detailShow: false
    };
  },
  methods: {
    getTableData() {
      // let data = {
      //   page: this.current,
      //   size: this.pageSize,
      //   pointId: "",
      //   state: ""
      // };
      // this.loading = true;
      // this.$api.maintain
      //   .getManageTaskList(data)
      //   .then(res => {
      //     if (res.data.state == 0) {
      //       this.loading = false;
      //       this.tableData = res.data.data.records;
      //       this.total = Number(res.data.data.total);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.loading = false;
      //   });
    },
    // cancel(value) {
    //   this.show = value;
    //   this.delayShow = value;
    //   this.closeShow = value;
    //   this.detailShow = value;
    //   this.getTableData();
    // },
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
    },
    goDetail(row) {
      this.$router.push({
        path: "/maintain/mission/detail",
        query: { id: row.id }
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
