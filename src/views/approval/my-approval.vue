<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="6">
          <div class="header-info">
            <span>审批总数</span>
            <p>
              {{
                countData.waitCount +
                  countData.approvalCount +
                  countData.rejectCount
              }}
            </p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>等待审批</span>
            <p>{{ countData.waitCount }}</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>审批通过</span>
            <p>{{ countData.approvalCount }}</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info none-border">
            <span>审批驳回</span>
            <p>{{ countData.rejectCount }}</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">审批列表</div>
        <div class="extra">
          <a-form layout="inline">
            <a-form-item>
              <a-select
                defaultValue="all"
                style="width: 120px"
                v-model="formInline.type"
                @change="getTableData"
              >
                <a-select-option value="">全部审批</a-select-option>
                <a-select-option value="1">任务延期</a-select-option>
                <a-select-option value="2">任务转交</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-radio-group
                v-model="formInline.state"
                buttonStyle="solid"
                @change="getTableData"
              >
                <a-radio-button value="">全部</a-radio-button>
                <a-radio-button value="1">通过</a-radio-button>
                <a-radio-button value="2">驳回</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <a-table
        size="middle"
        :columns="columns"
        :dataSource="data"
        v-margin:top="16"
        :rowKey="(record, index) => index"
        :pagination="false"
      >
        <template slot="type" slot-scope="type">
          <a-tag color="green" v-if="type == 1">延迟</a-tag>
          <a-tag color="blue" v-if="type == 2">转交</a-tag>
        </template>
        <template slot="state" slot-scope="state">
          <a-badge status="success" text="通过" v-if="state == 1" />
          <a-badge status="success" text="驳回" v-if="state == 2" />
        </template>
        <span slot="action" slot-scope="row">
          <a @click="check(row)">查看</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        :showTotal="total => `共 ${total} 条`"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pagesize"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
      <modal v-model="modalInfo"> </modal>
    </a-card>
  </div>
</template>

<script>
import modal from "@/components/approval/check-modal";
export default {
  components: { modal },
  data() {
    return {
      countData: {
        waitCount: 0,
        rejectCount: 0,
        approvalCount: 0,
        complateCount: 0
      },
      modalInfo: { show: false },
      current: 1,
      total: 0,
      pagesize: 10,
      formInline: {
        state: "",
        type: ""
      },
      columns: [
        {
          title: "标题",
          dataIndex: "title",
          ellipsis: true
        },
        {
          title: "审批类型",
          dataIndex: "type",
          align: "center",
          width: 150,
          scopedSlots: { customRender: "type" }
        },
        {
          title: "状态",
          dataIndex: "state",
          align: "center",
          scopedSlots: { customRender: "state" }
        },
        {
          title: "审批人",
          dataIndex: "approvalName",
          ellipsis: true
        },
        {
          title: "申请时间",
          align: "center",
          width: 200,
          dataIndex: "applyTime"
        },
        {
          title: "审核时间",
          align: "center",
          width: 200,
          dataIndex: "approvalTime"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.getTableData();
    this.getApprovalCount();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    check(row) {
      this.modalInfo = {
        show: true,
        info: row
      };
    },
    getTableData() {
      let data = {
        index: this.current,
        size: this.pagesize,
        state: this.formInline.state,
        type: this.formInline.type
      };
      this.$api.approval.getMyApprovalList(data).then(res => {
        this.data = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    getApprovalCount() {
      let data = {};
      this.$api.approval
        .getApprovalCount(data)
        .then(res => {
          this.countData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
