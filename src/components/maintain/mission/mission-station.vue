<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="企业名称">
        <a-input
          placeholder="请输入"
          v-model="formInline.enterpriseName"
          :maxLength="30"
          @pressEnter="onSubmit"
        />
      </a-form-item>
      <a-form-item label="站点名称">
        <a-input
          placeholder="请输入"
          v-model="formInline.pointName"
          :maxLength="30"
          @pressEnter="onSubmit"
        />
      </a-form-item>
      <a-form-item label="任务状态">
        <a-select
          defaultValue="all"
          style="width: 120px"
          v-model="formInline.isComplete"
          showSearch
          :filterOption="filterOptions"
          @change="onSubmit"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">已完成</a-select-option>
          <a-select-option value="0">处理中</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item style="float: right">
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
        <a-button @click="resetFormInLine" v-margin:left="16">
          重置
        </a-button>
      </a-form-item>
    </a-form>
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
      :enterpriseList="enterpriseList"
      @cancel="cancel"
    ></add-edit>
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
        enterpriseName: "",
        pointName: "",
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
      tableData: [],
      enterpriseList: [],
      stationList: [],
      planList: [],
      show: false
    };
  },
  watch: {},
  methods: {
    getSelectEnterprise() {
      //企业
      this.$api.common.selectEnterprise().then(res => {
        this.enterpriseList = res.data.data;
      });
    },
    getTableData() {
      let params = {
        page: this.current,
        size: this.size,
        enterpriseName: this.formInline.enterpriseName,
        pointName: this.formInline.pointName,
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
    this.getSelectEnterprise();
  }
};
</script>
<style lang="less" scoped></style>
