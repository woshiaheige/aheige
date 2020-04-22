<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-select
            showSearch
            :value="formInline.enterpriseName"
            placeholder="请输入"
            style="width: 200px"
            :defaultActiveFirstOption="false"
            :showArrow="false"
            :filterOption="false"
            @search="searchEnterprise"
            :notFoundContent="null"
          >
            <a-select-option
              v-for="(item, index) in enterpriseList"
              @click="slectEnterprise(item)"
              :key="index"
              :value="item.name"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="监控点名称">
          <a-select
            showSearch
            :value="formInline.pointName"
            placeholder="请输入"
            style="width: 200px"
            :defaultActiveFirstOption="false"
            :showArrow="false"
            :filterOption="false"
            @search="searchPoint"
            :notFoundContent="null"
          >
            <a-select-option
              v-for="(item, index) in pointList"
              @click="slectPoint(item)"
              :key="index"
              :value="item.name"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="任务状态">
          <a-select
            defaultValue="all"
            style="width: 120px"
            v-model="formInline.taskStatus"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">已完成</a-select-option>
            <a-select-option value="2">处理中</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="任务时间">
          <a-range-picker @change="onChange" />
        </a-form-item> -->
        <a-form-item style="float: right">
          <a-button type="primary" @click="resetFormInLine">
            重置
          </a-button>
        </a-form-item>
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
        <div class="title">任务列表</div>
        <div class="extra">
          <a-button type="primary" html-type="submit" @click="show = true">
            <a-icon type="plus" />突发任务
          </a-button>
        </div>
      </div>
      <a-table
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :loading="loading"
        v-margin:top="16"
      >
        <template slot="taskStatus" slot-scope="taskStatus">
          <a-badge
            :status="taskStatus == 1 ? 'success' : 'warning'"
            :text="taskStatus == 1 ? '已完成' : '处理中'"
          />
        </template>
        <template slot="type" slot-scope="type">
          <a-tag color="blue" v-if="type == 32">水类</a-tag>
          <a-tag color="red" v-if="type == 31">气类</a-tag>
          <a-tag color="green" v-if="type != 31 && type != 32">其他</a-tag>
        </template>
        <span slot="action" slot-scope="row">
          <!-- <a @click="delayShow = true">申请延期</a>
          <a-divider type="vertical" />
          <a @click="closeShow = true">任务关闭</a> -->
          <a @click="goDetail(row)">任务详情</a>
        </span>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :current="current"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
      <!--新建-->
      <add-edit
        :visible="show"
        :planList="planList"
        :stationList="stationList"
        @cancel="cancel"
      ></add-edit>
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
import addEdit from "@/components/maintain/mission/add-edit";
// import detailModal from "@/components/maintain/mission/detail";
// import delayModal from "@/components/maintain/mission/delay";
// import closeModal from "@/components/maintain/mission/close";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      loading: false,
      formInline: {
        enterpriseName: undefined,
        enterpriseId: "",
        pointId: "",
        pointName: undefined,
        taskStatus: "all"
      },
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName"
        },
        {
          title: "运维站点",
          dataIndex: "pointName"
        },
        {
          title: "站点类别",
          dataIndex: "pointTypeName"
        },
        {
          title: "任务状态",
          dataIndex: "taskStatus",
          scopedSlots: { customRender: "taskStatus" },
          align: "center",
          width: 150
        },
        {
          title: "任务数量",
          dataIndex: "taskCount"
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
          id: 1,
          enterpriseName: "环保有限公司",
          pointName: "站点1",
          pointTypeName: "类别A",
          taskStatus: 2,
          taskCount: 10
        }
      ],
      enterpriseList: [],
      pointList: [],
      stationList: [],
      planList: [],
      show: false
      // delayShow: false,
      // closeShow: false,
      // detailShow: false
    };
  },
  methods: {
    searchEnterprise(value) {
      //搜索企业
      this.formInline.enterpriseName = value;
      this.$api.customer
        .getEnterPriseList({ enterpriseName: value })
        .then(res => {
          this.enterpriseList = res.data.data.records;
        });
    },
    slectEnterprise(value) {
      this.formInline.enterpriseId = value.id;
      this.formInline.enterpriseName = value.name;
    },
    searchPoint(value) {
      //搜索站点
      this.formInline.pointName = value;
      this.$api.customer.getStationList({ pointName: value }).then(res => {
        this.pointList = res.data.data.records;
      });
    },
    slectPoint(value) {
      this.formInline.pointId = value.id;
      this.formInline.pointName = value.name;
    },
    getTableData() {
      let params = {
        page: this.current,
        size: this.size,
        enterpriseId: this.formInline.enterpriseId,
        pointId: this.formInline.pointId,
        taskStatus:
          this.formInline.taskStatus == "all" ? "" : this.formInline.taskStatus
      };
      this.loading = true;
      this.$api.maintain
        .managePointTask(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
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
    resetFormInLine() {
      this.formInline = this.$options.data().formInline;
    },
    // getPlan() {
    //   this.$api.common.selectPlan().then(res => {
    //     if (res.data.state == 0) {
    //       this.planList = res.data.data;
    //     }
    //   });
    // },
    goDetail(row) {
      this.$router.push({
        path: "/maintain/mission/detail",
        query: { pointId: row.pointId }
      });
    }
  },
  mounted() {
    this.getStation();
    // this.getPlan();
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
