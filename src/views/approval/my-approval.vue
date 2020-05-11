<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="6">
          <div class="header-info">
            <span>审批总数</span>
            <p>{{ countData.approvalCount }}</p>
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
            <p>{{ countData.complateCount }}</p>
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
                showSearch
                :filterOption="filterOptions"
              >
                <a-select-option value="">全部审批</a-select-option>
                <a-select-option value="1">任务转交</a-select-option>
                <a-select-option value="2">任务延期</a-select-option>
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
        bordered
        size="middle"
        :columns="columns"
        :dataSource="data"
        v-margin:top="16"
        :rowKey="(record, index) => index"
        :pagination="false"
      >
        <template slot="type" slot-scope="type">
          <a-tag color="red" v-if="type == 3">关闭</a-tag>
          <a-tag color="green" v-if="type == 2">延迟</a-tag>
          <a-tag color="blue" v-if="type == 1">转交</a-tag>
        </template>
        <template slot="state" slot-scope="state">
          <a-badge color="orange" text="待处理" v-if="state == 1" />
          <a-badge color="blue" text="处理中" v-if="state == 2" />
          <a-badge color="green" text="通过" v-if="state == 3" />
          <a-badge color="red" text="未通过" v-if="state == 4" />
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
        :pageSize.sync="pageSize"
        :current="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
      <!-- 查看弹窗 -->
      <modal :obj="modalInfo" :visible="visible" @cancel="onCancel"> </modal>
    </a-card>
  </div>
</template>

<script>
import modal from "@/components/approval/show-modal";
export default {
  components: { modal },
  data() {
    return {
      visible: false,
      countData: {
        waitCount: 0, //等待审批
        rejectCount: 0, //驳回审批
        approvalCount: 0, //审批总数
        complateCount: 0 //审批完成数
      },
      modalInfo: {
        info: {
          id: 1,
          state: 1,
          approvalName: "",
          approvalTime: ""
        }
      },
      current: 1,
      total: 0,
      pageSize: 10,
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
          ellipsis: true,
          customRender: text => {
            if (!text) {
              return "-";
            } else {
              return text;
            }
          }
        },
        {
          title: "申请时间",
          width: 200,
          dataIndex: "applyTime"
        },
        {
          title: "审核时间",
          width: 200,
          dataIndex: "approvalTime",
          customRender: text => {
            if (!text) {
              return "-";
            } else {
              return text;
            }
          }
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
    //关闭弹窗事件
    onCancel() {
      this.visible = false;
    },
    //查看弹窗事件
    check(row) {
      this.visible = true;
      this.modalInfo = {
        show: true,
        info: row
      };
    },
    //获取表格数据
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        state: this.formInline.state,
        type: this.formInline.type
      };
      this.$api.approval.getMyApprovalList(data).then(res => {
        this.data = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    //获取统计数据
    getApprovalCount() {
      let data = {
        type: "1"
      };
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
