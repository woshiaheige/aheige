<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            @pressEnter="getTableData"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="合同编号">
          <a-input
            placeholder="请输入"
            v-model="list.number"
            @pressEnter="getTableData"
            :maxLength="30"
          ></a-input>
        </a-form-item>
        <a-form-item label="合同状态">
          <a-select
            placeholder="请选择"
            v-width="150"
            v-model="list.state"
            showSearch
            :filterOption="filterOptions"
            @change="getTableData"
          >
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option
              v-for="item in statusOption"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}</a-select-option
            >
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
    <a-card :bordered="false" class="contract" v-margin:top="16">
      <div class="card-header">
        <div class="title">合同管理</div>
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
        <span slot="period" slot-scope="period, row">
          <span>{{ $moment(row.gmtBegin).format("YYYY-MM-DD") }}</span> ~
          <span>{{ $moment(row.gmtEnd).format("YYYY-MM-DD") }}</span>
        </span>
        <template slot="state" slot-scope="state">
          <a-tag color="red" v-if="state == 2">合同终结</a-tag>
          <a-tag color="green" v-if="state == 1">履行中</a-tag>
        </template>
        <span slot="downLoad" slot-scope="row">
          <a @click="onDown(row)">附件下载</a>
        </span>
        <span slot="action" slot-scope="row">
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
        :statusOption="statusOption"
        v-model="obj"
        @refresh="getTableData"
      >
      </add-edit>
    </a-card>
  </div>
</template>

<script>
import addEdit from "@/components/customer/contract/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      loading: false,
      list: { state: "" },
      obj: {
        show: false
      },
      statusOption: [
        { name: "履行中", value: 1 },
        { name: "合同终结", value: 2 }
      ],
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "合同编号",
          dataIndex: "number",
          key: "number"
        },
        {
          title: "合同期限",
          dataIndex: "gmtEnd",
          scopedSlots: { customRender: "period" }
        },
        {
          title: "合同状态",
          dataIndex: "state",
          key: "state",
          align: "center",
          scopedSlots: { customRender: "state" },
          width: 110
        },
        {
          title: "合同材料",
          key: "downLoad",
          scopedSlots: { customRender: "downLoad" },
          align: "center",
          width: 110
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 110
        }
      ],
      tableData: []
    };
  },
  methods: {
    reset() {
      this.list = { state: "", name: "", number: "" };
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseName: this.list.name,
        number: this.list.number,
        state: this.list.state
      };
      this.loading = true;
      this.$api.customer
        .getContractList(data)
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
    onDelete(row) {
      let that = this;
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          that.$api.customer
            .delContract({
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
    },
    onDown(row) {
      if (row.fileId == null) {
        this.$message.warn("没有附件");
        return;
      }
      this.$api.customer.downloadFile({ id: row.fileId }).then(() => {
        window.location.href =
          this.$api.base.api + "files/download/file/" + row.fileId;
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
