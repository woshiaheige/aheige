<template>
  <div>
    <a-card :bordered="false"
      ><a-form-model layout="inline">
        <a-form-model-item label="企业名称">
          <a-input v-model="formInline.enterpriseName" placeholder="请输入" />
        </a-form-model-item>
        <a-form-model-item label="监控点名称">
          <a-input v-model="formInline.pointName" placeholder="请输入" />
        </a-form-model-item>
        <a-form-item label="报表类型">
          <a-select
            placeholder="请选择"
            allowClear
            v-width="150"
            v-model="formInline.reportType"
            showSearch
            :filterOption="filterOptions"
          >
            <a-select-option
              v-for="item in rportTypeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-model-item label="时间范围">
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item style="float:right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model></a-card
    >
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">报表推送</div>
      </div>
      <a-table
        size="middle"
        :loading="loading"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <template slot="type" slot-scope="type">
          <a-tag color="green" v-if="type == 1">季报表</a-tag>
          <a-tag color="cyan" v-if="type == 2">月报表</a-tag>
          <a-tag color="blue" v-if="type == 3">周报表</a-tag>
        </template>
        <span slot="action" slot-scope="row">
          <a @click="toReportModal(row)">查看</a>
        </span>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pagesize"
        :showTotal="total => `共 ${total} 条`"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
    </a-card>
    <notification-modal :obj="modal" @cancel="onCancel"></notification-modal>
  </div>
</template>

<script>
import notificationModal from "@/components/maintain/notification/notification-modal";
export default {
  components: { notificationModal },
  data() {
    return {
      modal: {
        show: false,
        id: "",
        beginTime: "",
        endTime: ""
      },
      rportTypeList: [
        { name: "全部", value: "all" },
        { name: "季报表", value: 1 },
        { name: "月报表", value: 2 },
        { name: "周报表", value: 3 }
      ],
      loading: false,
      pagesize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          title: "推送企业",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "监控点名称",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "报表类型",
          dataIndex: "type",
          width: 200,
          align: "center",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "推送时间",
          dataIndex: "gmtCreate",
          key: "gmtCreate",
          width: 200
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      formInline: {
        enterpriseName: "",
        beginTime: "",
        reportType: "all",
        endTime: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onCancel() {
      this.modal.show = false;
    },
    toReportModal(row) {
      this.modal = {
        show: true,
        id: row.id,
        pointId: row.pointId,
        beginTime: row.gmtBeginTime,
        endTime: row.gmtEndTime,
        title: row.pointName,
        mn: row.mn
      };
      this.$bus.$emit("todoSth", this.modal);
    },
    getTableData() {
      let params = {
        size: this.size,
        page: this.current,
        beginTime: this.formInline.beginTime
          ? this.$moment(this.formInline.beginTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : "",
        endTime: this.formInline.endTime
          ? this.$moment(this.formInline.endTime).format("YYYY-MM-DD HH:mm:ss")
          : "",
        enterpriseName: this.formInline.enterpriseName,
        type:
          this.formInline.reportType != "all" ? this.formInline.reportType : ""
      };
      this.loading = true;
      this.$api.maintain
        .reportPush(params)
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
    onChange(date, dateString) {
      this.formInline.beginTime = dateString[0] + " 00:00:00";
      this.formInline.endTime = dateString[1] + " 23:59:59";
    }
  }
};
</script>
