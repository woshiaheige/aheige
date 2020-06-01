<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="车牌号码">
          <a-input
            placeholder="请输入"
            v-model="list.number"
            @pressEnter="onSubmit"
          ></a-input>
        </a-form-item>
        <a-form-item label="车辆品牌">
          <a-input
            placeholder="请输入"
            v-model="list.model"
            @pressEnter="onSubmit"
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
        <div class="title">维修保养费用详情</div>
        <div class="extra">
          <a-button type="primary" @click="visible = true">
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
          <span style="float: right">￥{{ costCount }}</span>
        </template>
        <span slot="action" slot-scope="row">
          <a @click="onEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
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

    <repair-fee
      :modalInfo="modalInfo"
      :visible.sync="visible"
      @updateTable="getTableData"
    ></repair-fee>
  </div>
</template>

<script>
import repairFee from "@/components/car/fee/repair-fee";
export default {
  components: {
    repairFee
  },
  watch: {
    visible(nval) {
      if (nval == false) {
        this.modalInfo = { type: 5 };
      }
    }
  },
  data() {
    return {
      visible: false,
      modalInfo: { type: 5 }, //1油费2过路费3保险费4年检费5维修保养费
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "车牌号",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "车辆品牌",
          dataIndex: "model",
          key: "model"
        },
        {
          title: "付款时间",
          dataIndex: "gmtPayment",
          key: "gmtPayment",
          customRender: text => {
            let content = "";
            content = text ? this.$moment(text).format("YYYY-MM-DD") : "";
            return content;
          }
        },
        {
          title: "付款金额（元）",
          dataIndex: "payment",
          key: "payment",
          customRender: text => {
            if (text) {
              return "￥" + text;
            } else {
              return "-";
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
      list: {
        model: "",
        number: "",
        range: [this.$moment().subtract(6, "days"), this.$moment()]
      },
      costCount: 0,
      diffDay: 0
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    reset() {
      this.list = {
        model: "",
        number: "",
        range: [this.$moment().subtract(7, "days"), this.$moment()]
      };
      this.onSubmit();
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        number: this.list.number,
        model: this.list.model,
        payBeginTime: this.$moment(this.list.range[0]).format("YYYY-MM-DD"),
        payEndTime: this.$moment(this.list.range[1]).format("YYYY-MM-DD")
      };
      this.loading = true;
      this.$api.car
        .assetMaintenanceCost(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            let result = res.data.data;
            this.tableData = result.records;
            this.total = Number(result.total);
            this.costCount = this.getCostCount();
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    getCostCount() {
      let costCount = 0;
      if (this.tableData.length != 0) {
        costCount = this.tableData[0].totalAmount;
      } else {
        costCount = 0;
      }
      return costCount.toFixed(2);
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
    },
    onEdit(row) {
      this.visible = true;
      this.modalInfo = row;
    },
    onDelete(row) {
      console.log(row);
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除${row.number}的维修保养费用详情`,
        onOk() {
          console.log("OK");
          _this.$api.car
            .deleteAssetMaintenanceCost({ id: row.id })
            .then(res => {
              if (res.data.state == 0) {
                _this.$message.success("删除成功");
                if (_this.tableData.length == 1) {
                  if (_this.current > 1) _this.current--;
                }
                _this.getTableData();
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
