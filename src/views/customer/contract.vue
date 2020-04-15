<template>
  <a-card :bordered="false" class="contract" title="合同管理">
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="企业名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="合同编号"></a-input>
      </a-form-item>
      <a-form-item>
        <a-select placeholder="合同状态" v-width="150">
          <a-select-option
            v-for="item in statusOption"
            :key="item.value"
            :value="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查找
        </a-button>
        <a-button type="success" v-margin:left="10" @click="onEdit()">
          新增
        </a-button>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      :loading="loading"
      bordered
    >
      <span slot="period" slot-scope="period, row">
        <span>{{ row.startTime }}</span
        >至<span>{{ row.endTime }}</span>
      </span>
      <span slot="action" slot-scope="row">
        <a @click="onEdit(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
      @change="pagechange"
      @showSizeChange="sizechange"
    />

    <add-edit :visible.sync="visible" :contractId="contractId"> </add-edit>
  </a-card>
</template>

<script>
import addEdit from "@/components/customer/contract/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      total: 1,
      pagesize: 10,
      visible: false,
      contractId: "",
      loading: false,
      statusOption: [
        { name: "履行中", value: 1 },
        { name: "已过期", value: 2 },
        { name: "即将到期", value: 3 },
        { name: "合同终结", value: 4 }
      ],
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => `${index + 1}`,
          align: "center"
        },
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "合同编号",
          dataIndex: "num",
          key: "num",
          align: "center"
        },
        {
          title: "合同排期",
          dataIndex: "time",
          key: "time",
          align: "center"
        },
        {
          title: "合同状态",
          dataIndex: "status",
          key: "status",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [
        {
          num: "12345678",
          name: "广东华兴玻璃有限公司",
          status: "履行中",
          time: "2020-02-15"
        }
      ]
    };
  },
  methods: {
    getTableData() {
      // let params = {
      //   page: this.current,
      //   size: this.pagesize
      // };
      // this.loading = true;
      // this.$api.customer
      //   .cusContract(params)
      //   .then(res => {
      //     if (res.data.state == 0) {
      //       this.tableData = res.data.data;
      //       this.total = res.data.total;
      //       this.loading = false;
      //     }
      //   })
      //   .catch(error => {
      //     this.loading = false;
      //     console.log(error);
      //     this.tableData = [];
      //   });
    },
    onDelete(row) {
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
    onEdit(row) {
      if (row) {
        this.contractId = row.id;
      } else {
        this.contractId = "";
      }
      this.visible = true;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
