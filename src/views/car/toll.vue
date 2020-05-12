<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="车牌号码">
          <a-input
            placeholder="请输入"
            v-model="list.devName"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="车辆品牌">
          <a-input
            placeholder="请输入"
            v-model="list.brandName"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="付款时间">
          <a-range-picker
            :allowClear="false"
            format="YYYY-MM-DD"
            v-model="list.range"
            @change="handleChange"
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
        <div class="title">过路费详情</div>
        <div class="extra">
          <a-button type="primary" @click="add">
            <a-icon type="plus" />新建
          </a-button>
        </div>
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

    <add-fee v-model="modalInfo" @refresh="getTableData"></add-fee>
  </div>
</template>

<script>
import addFee from "@/components/car/add-fee";
export default {
  components: {
    addFee
  },
  data() {
    return {
      modalInfo: { show: false },
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "车牌号",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "车辆品牌",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "付款时间",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "付款价格",
          dataIndex: "brand",
          key: "brand"
        }
      ],
      tableData: [],
      list: {
        brandName: "",
        devName: "",
        range: [this.$moment().subtract(7, "days"), this.$moment()]
      },
      costCount: 0,
      diffDay: 0
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    add() {
      this.modalInfo = {
        show: true
      };
    },
    reset() {
      this.list = this.$options.data().list;
      this.onSubmit();
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        devName: this.list.devName,
        brandName: this.list.brandName,
        beginTime: this.$moment(this.list.range[0]).format("YYYY-MM-DD"),
        endTime: this.$moment(this.list.range[1]).format("YYYY-MM-DD"),
        type: 1 //1.设备，2.实验室设备，3.部件，4.试剂，5.标气，6.劳保用品，7.车辆，8.其他
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
    },
    handleChange(value) {
      this.diffDay = 0;
      var a = this.$moment(value[1]);
      var b = this.$moment(value[0]);
      this.diffDay = a.diff(b, "days");
      if (this.diffDay > 365) {
        this.$message.warn("时间不能超过一年，请重新选择时间");
      }
      this.getTableData();
    }
  }
};
</script>
