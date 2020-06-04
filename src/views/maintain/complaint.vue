<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input
            placeholder="请输入"
            style="width: 200px"
            v-model="formInline.enterpriseName"
            @pressEnter="onSubmit"
          />
        </a-form-item>
        <a-form-item label="投诉类型">
          <a-select
            defaultValue="all"
            style="width: 120px"
            v-model="formInline.complaintType"
            showSearch
            :filterOption="filterOptions"
            @change="onSubmit"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">投诉</a-select-option>
            <a-select-option value="2">建议</a-select-option>
            <a-select-option value="3">反馈</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            defaultValue="all"
            style="width: 120px"
            v-model="formInline.state"
            showSearch
            :filterOption="filterOptions"
            @change="onSubmit"
          >
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">待处理</a-select-option>
            <a-select-option value="3">已处理</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="时间范围">
          <a-range-picker @change="onChange" />
        </a-form-item>

        <a-form-item style="float: right">
          <a-button @click="resetFormInLine">
            重置
          </a-button>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">投诉列表</div>
      </div>
      <a-table
        rowKey="id"
        size="middle"
        :loading="loading"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        v-margin:top="16"
      >
        <template slot="state" slot-scope="state, row">
          <a-badge status="success" :text="row.stateName" v-show="state != 1" />
          <a-badge status="warning" :text="row.stateName" v-show="state == 1" />
        </template>
        <span slot="action" slot-scope="row">
          <a @click="onDetail(row)">查看</a>
          <a-divider type="vertical" v-show="row.state == 1" />
          <a @click="onEdit(row)" v-show="row.state == 1">处理</a>
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
      <!-- 处理投诉 -->
      <complaint-dispose
        :visible.sync="disposeVisible"
        :complaintDetail="detail"
        @updateTable="getTableData"
      />

      <!-- 投诉详情 -->
      <complaint-detail :visible.sync="visible" :complaintDetail="detail" />
    </a-card>
  </div>
</template>
<script>
import complaintDispose from "@/components/maintain/complaint/complaint-dispose";
import complaintDetail from "@/components/maintain/complaint/complaint-detail";
export default {
  components: { complaintDetail, complaintDispose },
  data() {
    return {
      loading: false,
      disposeVisible: false,
      formInline: {
        enterpriseName: undefined,
        state: "all",
        complaintType: "all", //投诉类型
        range: []
      },
      visible: false,
      current: 1,
      size: 10,
      total: 0,
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName"
        },
        {
          title: "状态",
          dataIndex: "state",
          align: "center",
          scopedSlots: { customRender: "state" }
        },
        {
          title: "上报时间",
          dataIndex: "gmtCreate"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
      detail: ""
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
    },
    resetFormInLine() {
      this.formInline = this.$options.data().formInline;
      this.getTableData();
    },
    getTableData() {
      let params = {
        size: this.size,
        page: this.current,
        enterpriseName: this.formInline.enterpriseName,
        state: this.formInline.state == "all" ? "" : this.formInline.state
      };
      this.loading = true;
      this.$api.maintain
        .getManageComplaintsPage(params)
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
    onDetail(row) {
      console.log(row);
      this.$api.maintain.getManageComplaintById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.visible = true;
          this.detail = res.data.data;
        }
      });
    },
    onEdit(row) {
      this.$api.maintain.getManageComplaintById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.disposeVisible = true;
          this.detail = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
