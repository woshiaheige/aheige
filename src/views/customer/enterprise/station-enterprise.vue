<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="8">
          <div class="header-info">
            <span>站点</span>
            <p>{{ countData.total }}</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info">
            <span>停运站点</span>
            <p>{{ countData.blockTotal }}</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info">
            <span>停运率</span>
            <p>{{ countData.percentage }}%</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="customer" v-margin:top="16">
      <div class="title">
        {{ $route.query.enterpriseName }}
      </div>
      <a-form layout="inline">
        <a-form-item label="站点名称">
          <a-input
            placeholder="请输入"
            v-model="list.pointName"
            @pressEnter="onSubmit"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="MN号">
          <a-input
            placeholder="请输入"
            v-model="list.mn"
            @pressEnter="onSubmit"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="站点类型">
          <a-select
            placeholder="请选择"
            v-width="150"
            v-model="list.type"
            showSearch
            :filterOption="filterOptions"
            @change="onSubmit"
          >
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option
              v-for="item in pointOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="enterprise" v-margin:top="16">
      <div class="card-header">
        <div class="title">站点列表</div>
        <div class="extra">
          <a-button type="primary" @click="onEdit('add')">
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
        <template slot="transferType" slot-scope="transferType">
          <a-tag color="blue" v-if="transferType == 1">无线传输</a-tag>
          <a-tag color="green" v-if="transferType == 2">有线传输</a-tag>
        </template>
        <template slot="isStarted" slot-scope="row">
          <span @click="clickRow(row)">
            <i-switch
              size="large"
              :value="row.isStarted == 1 ? true : false"
              :before-change="handleBeforeChange"
            >
              <span slot="open">正常</span>
              <span slot="close">停运</span>
            </i-switch>
          </span>
          <a-tooltip placement="top" v-if="row.stopReason !== null">
            <template slot="title">
              <p>{{ row.stopReason }}</p>
            </template>
            <a-icon
              type="question-circle"
              theme="filled"
              :style="{
                marginLeft: '8px',
                fontSize: '16px',
                verticalAlign: 'middle',
                color: 'rgba(0, 0, 0, 0.25)'
              }"
            />
          </a-tooltip>
        </template>
        <span slot="action" slot-scope="row">
          <a @click="goFactor(row)">监测因子</a>
          <a-divider type="vertical" />
          <a @click="goDevice(row)">监测设备</a>
          <a-divider type="vertical" />
          <a @click="onEdit('edit', row)">编辑</a>
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

      <add-edit
        :pointOptions="pointOptions"
        v-model="obj"
        @refresh="getTableData"
      ></add-edit>
      <!--是否停运-->
      <run-model v-model="runInfo" @refresh="getTableData"></run-model>
    </a-card>
  </div>
</template>

<script>
import addEdit from "@/components/customer/station/add-edit-station";
import runModel from "@/components/customer/station/run-model";
export default {
  name: "station-enterprise",
  components: { addEdit, runModel },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      columns: [
        {
          title: "站点名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "所属企业",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "MN号",
          dataIndex: "mn",
          key: "mn"
        },
        {
          title: "传输类型",
          key: "transferType",
          dataIndex: "transferType",
          scopedSlots: { customRender: "transferType" },
          align: "center",
          width: 150
        },
        {
          title: "是否停运",
          key: "isStarted",
          align: "center",
          scopedSlots: { customRender: "isStarted" },
          width: 100
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 300
        }
      ],
      tableData: [],
      obj: {
        show: false
      },
      list: {
        name: "",
        pointName: "",
        mn: "",
        type: ""
      },
      loading: false,
      pointOptions: [],
      runInfo: {
        show: false
      },
      switchInfo: {},
      countData: {
        total: 0,
        blockTotal: 0,
        percentage: "0.00"
      }
    };
  },
  mounted() {
    this.getTableData();
    this.getPointSelect();
    this.getCount();
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name === "customer-enterprise-factor" ||
      to.name === "customer-enterprise-device"
    ) {
      let arr = this.$store.state.includeArr;
      arr.push("station-enterprise");
      this.$store.dispatch("createIncludeArr", arr);
    } else if (to.name === "customer-enterprise") {
      let arr = this.$store.state.includeArr.filter(
        item => item !== "station-enterprise"
      );
      this.$store.dispatch("createIncludeArr", arr);
    } else {
      this.$store.dispatch("createIncludeArr", []);
    }
    next();
  },
  methods: {
    reset() {
      this.list = { name: "", pointName: "", mn: "", type: "" };
      this.onSubmit();
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        type: this.list.type,
        pointName: this.list.pointName,
        mn: this.list.mn,
        enterpriseId: this.$route.query.id
      };
      this.loading = true;
      this.$api.customer
        .getStationList(data)
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
    getCount() {
      this.$api.customer
        .getCountNum({ enterpriseId: this.$route.query.id })
        .then(res => {
          if (res.data.state == 0) {
            res.data.data.percentage =
              res.data.data.percentage == null
                ? "0.00"
                : res.data.data.percentage;
            this.countData = res.data.data;
          }
        });
    },
    clickRow(row) {
      this.switchInfo = row;
    },
    handleBeforeChange() {
      return new Promise(() => {
        setTimeout(() => {
          if (!this.switchInfo.isStarted) {
            this.runInfo = {
              show: true,
              row: this.switchInfo,
              type: "open"
            };
          } else {
            this.runInfo = {
              show: true,
              row: this.switchInfo,
              type: "close"
            };
          }
        }, 500);
      });
    },
    //站点类型下拉
    getPointSelect() {
      let data = {
        code: "SYS_POINT_TYPE"
      };
      this.$api.common.geDictByParam(data).then(res => {
        this.pointOptions = res.data.data;
      });
    },
    goFactor(row) {
      this.$router.push({
        path: "/customer/enterprise/factor",
        query: {
          id: row.id,
          enterpriseName: this.$route.query.enterpriseName,
          pointName: row.name
        }
      });
    },
    goDevice(row) {
      this.$router.push({
        path: "/customer/enterprise/device",
        query: {
          id: row.id,
          enterpriseName: row.enterpriseName,
          pointName: row.name,
          type: row.type
        }
      });
    },
    onDelete(row) {
      let that = this;
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          that.$api.customer
            .delStation({
              id: row.id
            })
            .then(res => {
              if (res.data.state == 0) {
                that.$message.success("删除成功");
                if (that.tableData.length == 1) {
                  if (that.current > 1) that.current--;
                }
                that.getTableData();
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onEdit(type, row) {
      this.obj.show = true;
      this.obj.type = type;
      this.obj.row = row;
    }
  }
};
</script>
