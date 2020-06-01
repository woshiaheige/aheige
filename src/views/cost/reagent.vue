<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-select
            v-model="list.enterpriseId"
            placeholder="请选择"
            v-width="150"
            showSearch
            :filterOption="filterOptions"
            @change="changeEnterprise"
          >
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option
              v-for="item in enterPriseOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="站点名称">
          <a-select
            v-model="list.pointId"
            placeholder="请选择"
            v-width="150"
            showSearch
            :filterOption="filterOptions"
            :disabled="isDisabled"
            @change="freshenData"
          >
            <a-select-option
              v-for="item in pointOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="试剂名称">
          <a-select
            v-model="list.goodsId"
            placeholder="请选择"
            v-width="150"
            showSearch
            :filterOption="filterOptions"
            @change="freshenData"
          >
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option
              v-for="item in goodsOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="出库时间">
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
      <a-tabs v-model="activeKey" @change="changeTab">
        <a-tab-pane key="1" tab="出库详情">
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
              <span style="float: right">￥{{ costCount }}</span>
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
        </a-tab-pane>
        <a-tab-pane key="2" tab="成本统计分析">
          <pie-charts v-model="list" ref="childPie"></pie-charts>
        </a-tab-pane>
        <a-tab-pane key="3" tab="成本趋势分析">
          <line-charts v-model="list" ref="childLine"></line-charts>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import pieCharts from "@/components/cost/pie-charts";
import lineCharts from "@/components/cost/line-charts";
export default {
  components: { pieCharts, lineCharts },
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
          title: "站点名称",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "试剂名称",
          dataIndex: "goodsName",
          key: "goodsName"
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
          title: "单价(元)",
          dataIndex: "price",
          key: "price",
          customRender: text => {
            if (text) {
              return "￥" + text;
            } else {
              return "-";
            }
          }
        },
        {
          title: "出库时间",
          dataIndex: "gmtCreate",
          key: "gmtCreate"
        },
        {
          title: "总价(元)",
          dataIndex: "totalPrices",
          key: "totalPrices",
          customRender: text => {
            if (text) {
              return "￥" + text;
            } else {
              return "-";
            }
          }
        }
      ],
      tableData: [],
      list: {
        type: 4, //1.设备，2.实验室设备，3.部件，4.试剂，5.标气，6.劳保用品，7.车辆，8.其他
        enterpriseId: "",
        pointId: undefined,
        goodsId: "",
        range: [this.$moment().subtract(6, "days"), this.$moment()]
      },
      costCount: 0,
      enterPriseOptions: [],
      pointOptions: [],
      goodsOptions: [],
      isDisabled: true,
      diffDay: 0,
      isSearch: false,
      activeKey: "1"
    };
  },
  mounted() {
    this.freshenData();
    this.getEnterprise();
    this.getGoods();
  },
  methods: {
    reset() {
      this.isDisabled = true;
      this.isSearch = false;
      this.list = {
        type: 4,
        enterpriseId: "",
        pointId: undefined,
        goodsId: "",
        range: [this.$moment().subtract(6, "days"), this.$moment()]
      };
      this.onSubmit();
      this.changeTab(this.activeKey);
    },
    freshenData() {
      this.changeTab(this.activeKey);
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseId: this.list.enterpriseId,
        pointId: this.list.pointId || "",
        goodsId: this.list.goodsId,
        beginTime: this.$moment(this.list.range[0]).format("YYYY-MM-DD"),
        endTime: this.$moment(this.list.range[1]).format("YYYY-MM-DD"),
        type: this.list.type
      };
      this.loading = true;
      this.$api.cost
        .getCostList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            let result = res.data.data;
            this.tableData = result.voPage.records;
            this.total = Number(result.voPage.total);
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
      this.isDisabled = true;
      this.list.pointId = undefined;
      if (value) {
        this.isDisabled = false;
        this.getPoint(value);
      }
      this.freshenData();
    },
    //站点下拉
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
      this.$api.cost
        .getGoodsByType({
          type: this.list.type
        })
        .then(res => {
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
      this.freshenData();
    },
    changeTab(key) {
      let that = this;
      this.activeKey = key;
      switch (key) {
        case "1":
          that.getTableData();
          break;
        case "2":
          if (that.$refs.childPie) {
            that.$refs.childPie.getPieData(that.list);
          }
          break;
        case "3":
          if (that.$refs.childLine) {
            that.$refs.childLine.getLineData(that.list);
          }
          break;
      }
    }
  }
};
</script>
