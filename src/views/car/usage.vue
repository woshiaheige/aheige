<template>
  <a-card :bordered="false" class="maintain">
    <div class="card-header">
      <div class="title">使用记录</div>
      <div class="extra">
        <a-input-search
          v-model="number"
          placeholder="请输入车牌号码"
          style="width: 200px"
          @search="onSubmit"
        />
      </div>
    </div>
    <a-table
      size="middle"
      :columns="columns"
      :loading="loading"
      rowKey="id"
      :dataSource="tableData"
      :pagination="false"
      align="center"
      v-margin:top="16"
    >
      <span slot="usageTime" slot-scope="usageTime, row">
        {{ $moment(row.gmtDrive).format("YYYY-MM-DD") }}
      </span>
      <a slot="check" slot-scope="row">
        <a @click="goDetail(row)">查看</a>
      </a>
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
  </a-card>
</template>
<script>
export default {
  name: "car-usage",
  components: {},
  data() {
    return {
      current: 1,
      total: 0,
      size: 10,
      loading: false,
      columns: [
        {
          title: "车辆",
          dataIndex: "number"
        },
        {
          title: "行驶距离",
          dataIndex: "driveDistance"
        },
        {
          title: "平均车速",
          dataIndex: "avgSpeed"
        },
        {
          title: "最大车速",
          dataIndex: "maxSpeed"
        },
        {
          title: "驾驶时间",
          dataIndex: "usageTime",
          scopedSlots: { customRender: "usageTime" }
        },
        {
          title: "行驶路径",
          key: "check",
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: [],
      number: ""
    };
  },
  methods: {
    getTableData() {
      this.loading = true;
      let params = {
        size: this.size,
        page: this.current,
        number: this.number
      };
      this.$api.car
        .manageVehicleUse(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goDetail(row) {
      this.$router.push({
        path: "/car/usage/detail",
        query: {
          vehicleId: row.id,
          dataTime: this.$moment(row.gmtDrive).format("YYYY-MM-DD")
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "car-usage-detail") {
      let arr = [];
      arr.push("car-usage");
      this.$store.dispatch("createIncludeArr", arr);
    } else {
      this.$store.dispatch("createIncludeArr", []);
    }
    next();
  }
};
</script>
<style lang="less" scoped></style>
