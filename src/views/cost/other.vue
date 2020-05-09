<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input
            placeholder="请输入"
            v-model="list.enterpriseName"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="监控点名称">
          <a-input
            placeholder="请输入"
            v-model="list.pointName"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="设备名称">
          <a-input
            placeholder="请输入"
            v-model="list.devName"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="出库时间">
          <a-range-picker
            :allowClear="false"
            format="YYYY-MM-DD"
            v-model="list.range"
          />
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="enterprise" v-margin:top="16">
      <div class="card-header">
        <div class="title">出库详情</div>
      </div>
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
        <template slot="footer">
          合计
          <span style="float: right">{{ costCount }}</span>
        </template>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :current="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "监控点名称",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "品牌",
          dataIndex: "brand",
          key: "brand"
        },
        {
          title: "型号",
          dataIndex: "model",
          key: "model"
        },
        {
          title: "数量",
          dataIndex: "stockCount",
          key: "stockCount"
        },
        {
          title: "单位",
          dataIndex: "unit",
          key: "unit"
        },
        {
          title: "出库时间",
          dataIndex: "gmtModified",
          key: "gmtModified"
        },
        {
          title: "总价",
          dataIndex: "totalPrices",
          key: "totalPrices"
        }
      ],
      tableData: [],
      list: {
        enterpriseName: "",
        pointName: "",
        devName: "",
        range: []
      },
      costCount: 0
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    reset() {
      this.list = {
        enterpriseName: "",
        pointName: "",
        devName: "",
        range: []
      };
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseName: this.list.enterpriseName,
        pointName: this.list.pointName,
        devName: this.list.devName,
        beginTime: this.$moment(this.list.range[0]).format("YYYY-MM-DD"),
        endTime: this.$moment(this.list.range[1]).format("YYYY-MM-DD"),
        type: 8 //1.设备，2.实验室设备，3.部件，4.试剂，5.标气，6.劳保用品，7.车辆，8.其他
      };
      this.loading = true;
      this.$api.cost
        .getCostList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            let result = res.data.data;
            this.tableData = result.voIPage.records;
            this.total = Number(result.voIPage.total);
            this.costCount = result.totalAmount || 0;
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>
