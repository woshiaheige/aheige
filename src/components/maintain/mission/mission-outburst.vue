<template>
  <div>
    <a-table
      rowKey="id"
      size="middle"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      :loading="loading"
      v-margin:top="16"
    >
      <template slot="status" slot-scope="status">
        <a-badge status="default" text="待处理" v-show="status == 1" />
        <a-badge status="processing" text="处理中" v-show="status == 2" />
        <a-badge status="success" text="已完成" v-show="status == 3" />
        <a-badge status="warning" text="已关闭" v-show="status == 4" />
      </template>
      <span slot="action" slot-scope="row">
        <a @click="goDetail(row)">详情</a>
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
    <info-outburst
      :visible.sync="visible"
      :detail="missionDetail"
    ></info-outburst>
  </div>
</template>
<script>
import infoOutburst from "@/components/maintain/mission/info-outburst";

export default {
  components: { infoOutburst },
  data() {
    return {
      pointId: "",
      current: 1,
      size: 10,
      total: 0,
      loading: false,
      missionDetail: "",
      visible: false,
      columns: [
        {
          title: "任务名称",
          dataIndex: "name"
        },
        {
          title: "运维小组",
          dataIndex: "groupName"
        },
        {
          title: "运维人员",
          dataIndex: "handleName"
        },
        {
          title: "运维时间",
          dataIndex: "gmtExecution",
          customRender: text => `${this.$moment(text).format("YYYY-MM-DD")}`
        },
        {
          title: "运维状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          align: "center",
          width: 150
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 100
        }
      ],
      tableData: []
    };
  },
  methods: {
    getTableData() {
      let params = {
        type: 2,
        page: this.current,
        size: this.size,
        pointId: this.pointId
      };
      this.loading = true;
      this.$api.maintain
        .getManageTaskList(params)
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
    goDetail(row) {
      this.$api.maintain.getManageTaskById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.missionDetail = res.data.data;
          this.visible = true;
        }
      });
    }
  },
  mounted() {
    this.pointId = this.$route.query.pointId || "";
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
