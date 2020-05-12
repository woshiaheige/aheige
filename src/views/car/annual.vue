<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="车牌号码">
          <!-- <a-input
            placeholder="请输入"
            v-model="list.devName"
            @pressEnter="getTableData"
          ></a-input> -->
          <a-select
            v-model="list.goodsId"
            placeholder="请选择"
            v-width="150"
            showSearch
            :filterOption="filterOptions"
            @change="getTableData"
          >
            <a-select-option
              v-for="item in goodsOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="车辆品牌">
          <a-input
            placeholder="请输入"
            v-model="list.devName"
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
          <a-button type="primary" @click="onSubmit()" :disabled="isSearch">
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
        <div class="title">年检费用详情</div>
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
        enterpriseId: undefined,
        pointId: undefined,
        goodsId: undefined,
        devName: "",
        range: [this.$moment().subtract(7, "days"), this.$moment()]
      },
      costCount: 0,
      enterPriseOptions: [],
      pointOptions: [],
      goodsOptions: [],
      isDisabled: true,
      diffDay: 0,
      isSearch: false
    };
  },
  mounted() {
    this.getTableData();
    this.getEnterprise();
    this.getGoods();
  },
  methods: {
    add() {
      this.modalInfo = {
        show: true
      };
    },
    reset() {
      this.isDisabled = true;
      this.isSearch = false;
      this.list = {
        enterpriseId: undefined,
        pointId: undefined,
        goodsId: undefined,
        range: [this.$moment().subtract(7, "days"), this.$moment()]
      };
      this.onSubmit();
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseName: "",
        pointName: "",
        devName: this.list.devName,
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
    //企业下拉
    getEnterprise() {
      this.$api.common.selectEnterprise().then(res => {
        if (res.data.state == 0) {
          this.enterPriseOptions = res.data.data;
        }
      });
    },
    changeEnterprise(value) {
      this.isDisabled = false;
      this.list.pointId = undefined;
      this.getPoint(value);
      this.getTableData();
    },
    //监测点下拉
    getPoint(value) {
      this.$api.common
        .selectStationByEnterpriseId({
          enterpriseId: value
        })
        .then(res => {
          if (res.data.state == 0) {
            this.pointOptions = res.data.data;
          }
        });
    },
    //物资下拉
    getGoods() {
      this.$api.product.getGoodsSelect().then(res => {
        if (res.data.state == 0) {
          this.goodsOptions = res.data.data;
        }
      });
    },
    handleChange(value) {
      this.diffDay = 0;
      this.isSearch = false;
      var a = this.$moment(value[1]);
      var b = this.$moment(value[0]);
      this.diffDay = a.diff(b, "days");
      if (this.diffDay > 365) {
        this.$message.warn("时间不能超过一年，请重新选择时间");
        this.isSearch = true;
      }
      this.getTableData();
    }
  }
};
</script>
