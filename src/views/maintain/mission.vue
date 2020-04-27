<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-select
            @focus="onFocusEnterprise"
            showSearch
            v-model="formInline.enterpriseName"
            placeholder="请输入"
            style="width: 200px"
            :defaultActiveFirstOption="false"
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
            @focus="onFocusPoint"
            showSearch
            v-model="formInline.pointName"
            placeholder="请输入"
            style="width: 200px"
            :defaultActiveFirstOption="false"
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
            v-model="formInline.isComplete"
            showSearch
            :filterOption="filterOptions"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">已完成</a-select-option>
            <a-select-option value="0">处理中</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="任务时间">
          <a-range-picker @change="onChange" />
        </a-form-item> -->
        <a-form-item style="float: right">
          <a-button @click="resetFormInLine">
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
        <div class="title">站点列表</div>
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
        <template slot="isComplete" slot-scope="isComplete">
          <a-badge
            :status="isComplete == 1 ? 'success' : 'warning'"
            :text="isComplete == 1 ? '已完成' : '处理中'"
          />
        </template>
        <template slot="pointTypeName" slot-scope="pointTypeName">
          <a-tag color="blue" v-if="pointTypeName == '废气'">废气</a-tag>
          <a-tag color="green" v-if="pointTypeName == '废水'">废水</a-tag>
          <a-tag
            color="green"
            v-if="pointTypeName != '废气' && pointTypeName != '废水'"
            >{{ pointTypeName }}</a-tag
          >
        </template>
        <span slot="action" slot-scope="row">
          <!-- <a @click="delayShow = true">申请延期</a>
          <a-divider type="vertical" />
          <a @click="closeShow = true">任务关闭</a> -->
          <a @click="goDetail(row)">站点任务</a>
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
    </a-card>
  </div>
</template>
<script>
import addEdit from "@/components/maintain/mission/add-edit";
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
        enterpriseId: undefined,
        pointId: undefined,
        pointName: undefined,
        isComplete: "all"
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
          dataIndex: "pointTypeName",
          align: "center",
          scopedSlots: { customRender: "pointTypeName" }
        },
        {
          title: "任务状态",
          dataIndex: "isComplete",
          scopedSlots: { customRender: "isComplete" },
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
        // {
        //   id: 1,
        //   enterpriseName: "环保有限公司",
        //   pointName: "站点1",
        //   pointTypeName: "类别A",
        //   isComplete: 2,
        //   taskCount: 10
        // }
      ],
      enterpriseList: [],
      pointList: [],
      stationList: [],
      planList: [],
      show: false
    };
  },
  watch: {
    "formInline.enterpriseName"() {
      this.$set(this.formInline, "pointName", undefined);
      this.$set(this.formInline, "pointId", undefined);
    }
  },
  methods: {
    onFocusEnterprise() {
      //获取第一次聚焦的列表
      if (this.enterpriseList.length == 0) {
        this.searchEnterprise("");
      }
    },
    onFocusPoint() {
      //获取第一次聚焦的列表
      if (this.pointList.length == 0) {
        this.searchPoint("");
      }
    },
    searchEnterprise(value) {
      //搜索企业
      let params = {
        size: 20,
        page: 1,
        enterpriseName: value
      };
      this.$api.customer.getEnterPriseList(params).then(res => {
        this.enterpriseList = res.data.data.records;
      });
    },
    slectEnterprise(value) {
      this.formInline.enterpriseId = value.id;
      this.formInline.enterpriseName = value.name;
      this.searchPoint("");
    },
    searchPoint(value) {
      //搜索站点
      let params = {
        size: 20,
        page: 1,
        enterpriseName: this.formInline.enterpriseName,
        pointName: value
      };
      this.$api.customer.getStationList(params).then(res => {
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
        isComplete:
          this.formInline.isComplete == "all" ? "" : this.formInline.isComplete
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
    resetFormInLine() {
      this.formInline = this.$options.data().formInline;
      this.getTableData();
    },
    goDetail(row) {
      this.$router.push({
        path: "/maintain/mission/detail",
        query: { pointId: row.pointId }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
