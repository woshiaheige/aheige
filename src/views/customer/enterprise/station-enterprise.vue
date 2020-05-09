<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="监控点名称">
          <a-input
            placeholder="请输入"
            v-model="list.pointName"
            @pressEnter="getTableData"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="MN号">
          <a-input
            placeholder="请输入"
            v-model="list.mn"
            @pressEnter="getTableData"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="监控点类型">
          <a-select
            placeholder="请选择"
            v-width="150"
            v-model="list.type"
            showSearch
            :filterOption="filterOptions"
            @change="getTableData"
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
        <div class="title">监控点列表</div>
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
    </a-card>
  </div>
</template>

<script>
import addEdit from "@/components/customer/station/add-edit-station";
export default {
  name: "station-enterprise",
  components: { addEdit },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      columns: [
        {
          title: "监控点名称",
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
      pointOptions: []
    };
  },
  mounted() {
    this.getTableData();
    this.getPointSelect();
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name === "customer-enterprise-factor" ||
      to.name === "customer-enterprise-device"
    ) {
      let arr = [];
      arr.push("station-enterprise");
      this.$store.dispatch("createIncludeArr", arr);
    } else {
      this.$store.dispatch("createIncludeArr", []);
    }
    next();
  },
  methods: {
    reset() {
      this.list = { name: "", pointName: "", mn: "", type: "" };
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
    //监测点类型下拉
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
          pointName: row.name
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
