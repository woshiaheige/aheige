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
        <a-divider type="vertical" v-show="row.status == 1" />
        <a @click="onEdit(row)" v-show="row.status == 1">编辑</a>
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

    <mission-outburst-edit
      :visible.sync="visibleEdit"
      :modelInfo="editInfo"
      @updateTable="getTableData"
    />
  </div>
</template>
<script>
import infoOutburst from "@/components/maintain/mission/info-outburst";
import missionOutburstEdit from "@/components/maintain/mission/mission-outburst-edit";
export default {
  components: { infoOutburst, missionOutburstEdit },
  props: {
    execFormInline: {
      type: Object,
      default: function() {
        return {
          group: undefined,
          member: "",
          type: "2",
          isComplete: "all",
          range: []
        };
      }
    }
  },
  data() {
    return {
      visibleEdit: false,
      editInfo: {},
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
    reset() {
      this.current = 1;
      this.size = 10;
      this.getTableData();
    },
    getTableData() {
      let params = {
        type: 2,
        page: this.current,
        size: this.size,
        groupId: this.execFormInline.groupId,
        beginTime: this.execFormInline.range[0]
          ? this.$moment(this.execFormInline.range[0]).format("YYYY-MM-DD")
          : "",
        endTime: this.execFormInline.range[1]
          ? this.$moment(this.execFormInline.range[1]).format("YYYY-MM-DD")
          : "",
        userName: this.execFormInline.userName,
        state:
          this.execFormInline.isComplete == "all"
            ? ""
            : this.execFormInline.isComplete
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
    },
    onEdit(row) {
      this.$api.maintain.getManageTaskById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.editInfo = res.data.data;
          this.visibleEdit = true;
        }
      });
    }
  }
  // mounted() {
  //   this.pointId = this.$route.query.pointId || "";
  //   this.getTableData();
  // }
};
</script>
<style lang="less" scoped></style>
