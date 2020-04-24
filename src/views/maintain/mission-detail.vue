<template>
  <div>
    <!-- <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item label="监控点名称">
          <a-input placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item label="运维小组">
          <a-select
            defaultValue="all"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="jack">运维1组</a-select-option>
            <a-select-option value="lucy">运维2组</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="任务状态">
          <a-select
            defaultValue="all"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="jack">未完成</a-select-option>
            <a-select-option value="lucy">已完成</a-select-option>
            <a-select-option value="lucy">已逾期</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="任务时间">
          <a-range-picker @change="onChange" />
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card> -->
    <a-card :bordered="false" class="maintain" v-margin:top="16">
      <div class="card-header">
        <div class="title">任务列表</div>
        <!-- <div class="extra">
          <a-button type="primary" html-type="submit" @click="show = true">
            <a-icon type="plus" />突发任务
          </a-button>
        </div> -->
      </div>
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :loading="loading"
        v-margin:top="16"
      >
        <template slot="type" slot-scope="type">
          <a-tag color="#2db7f5" v-show="type == 1">例行任务</a-tag>
          <a-tag color="#f50" v-show="type == 2">突发任务</a-tag>
        </template>
        <template slot="status" slot-scope="status">
          <a-badge color="cyan" text="已创建" v-show="status == 1" />
          <a-badge status="processing" text="处理中" v-show="status == 2" />
          <a-badge status="success" text="已完成" v-show="status == 3" />
          <a-badge status="warning" text="已延期" v-show="status == 4" />
          <a-badge status="default" text="已关闭" v-show="status == 5" />
        </template>
        <span slot="action" slot-scope="row">
          <!-- <a @click="delayShow = true">申请延期</a>
          <a-divider type="vertical" />
          <a @click="closeShow = true">任务关闭</a> -->
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
      <add-edit :visible.sync="visible" :detail="missionDetail"></add-edit>
    </a-card>
  </div>
</template>
<script>
import addEdit from "@/components/maintain/mission/info";

export default {
  components: { addEdit },
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
          title: "任务类型",
          dataIndex: "name"
        },
        {
          title: "任务方案",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
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
          dataIndex: "gmtCreate",
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
      tableData: [
        // {
        //   id: "1",
        //   name: "方案1",
        //   team: "A小组",
        //   status: 1,
        //   handleName: "张三",
        //   gmtCreate: "2020-04-22"
        // }
      ]
    };
  },
  methods: {
    getTableData() {
      let params = {
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
