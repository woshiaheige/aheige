<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="6">
          <div class="header-info">
            <span>审批总数</span>
            <p>176</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>等待审批</span>
            <p>12</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>审批通过</span>
            <p>67</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info none-border">
            <span>审批驳回</span>
            <p>83</p>
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
                @change="handleChange"
              >
                <a-select-option value="all">全部人员</a-select-option>
                <a-select-option value="jack">张三</a-select-option>
                <a-select-option value="lucy">李四</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-select
                defaultValue="all"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="all">全部审批</a-select-option>
                <a-select-option value="jack">任务延期</a-select-option>
                <a-select-option value="lucy">任务转交</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-radio-group defaultValue="all" buttonStyle="solid">
                <a-radio-button value="all">全部</a-radio-button>
                <a-radio-button value="default">通过</a-radio-button>
                <a-radio-button value="small">驳回</a-radio-button>
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
        :pagination="false"
      >
        <template slot="type">
          任务转交
        </template>
        <template slot="status" slot-scope="status">
          <a-badge status="success" :text="status" />
        </template>
        <span slot="action" slot-scope="row">
          <a @click="check(row)">查看</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showQuickJumper
        showSizeChanger
        :total="total"
        :current="current"
      />
      <modal v-model="modalInfo"> </modal>
    </a-card>
  </div>
</template>

<script>
import modal from "@/components/approval/start-modal";
export default {
  components: { modal },
  data() {
    return {
      modalInfo: { show: false },
      current: 1,
      total: 0,
      columns: [
        {
          title: "标题",
          dataIndex: "name",
          width: 300
        },
        {
          title: "审批类型",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "状态",
          dataIndex: "status",
          align: "center",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "审批人",
          dataIndex: "people"
        },
        {
          title: "申请时间",
          dataIndex: "time"
        },
        {
          title: "审核时间",
          dataIndex: "time"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.getTableData();
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
      this.$api.approval.getWaitList().then(res => {
        this.data = res.data.data;
        this.total = res.data.total;
      });
    },
    delect(row) {
      console.log(row);
      this.$confirm({
        title: "确定删除" + row.name + "吗?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
