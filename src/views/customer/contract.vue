<template>
  <a-card :bordered="false" class="contract" title="合同管理">
    <a-button type="primary" @click="editContract('')">新增合同</a-button>

    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="period" slot-scope="period, row">
        <span>{{ row.startTime }}</span
        >至<span>{{ row.endTime }}</span>
      </span>
      <span slot="action" slot-scope="row">
        <a @click="editContract(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteContract(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />

    <contract-edit :visible.sync="visible" :contractId="contractId">
    </contract-edit>
  </a-card>
</template>

<script>
import contractEdit from "@/components/customer/contract-edit";
export default {
  components: { contractEdit },
  data() {
    return {
      current: 1,
      total: 1,
      visible: false,
      contractId: "",
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "合同编号",
          dataIndex: "num",
          key: "num"
        },
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "合同起止时间",
          key: "period",
          dataIndex: "period",
          scopedSlots: { customRender: "period" }
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          num: "12345678",
          name: "广东华兴玻璃有限公司",
          startTime: "2019-10-15",
          endTime: "2020-10-15"
        }
      ]
    };
  },
  methods: {
    deleteContract(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    editContract(row) {
      if (row) {
        this.contractId = row.id;
      } else {
        this.contractId = "";
      }
      this.visible = true;
    },
    getTableData() {
      this.$api.customer.getContractList().then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
