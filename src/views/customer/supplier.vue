<template>
  <a-card :bordered="false" class="standing" title="供应商管理">
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="供应商名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="联系人"></a-input>
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
      size="middle"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      bordered
    >
      <span slot="action" slot-scope="row">
        <a @click="onEdit(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
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
    <add-edit :obj="modalInfo" @cancel="cancel"> </add-edit>
  </a-card>
</template>

<script>
import addEdit from "@/components/customer/supplier/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      modalInfo: { show: false },
      current: 1,
      total: 0,
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "供应商名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "所属区域",
          dataIndex: "area",
          align: "center"
        },
        {
          title: "地址",
          dataIndex: "address",
          align: "center"
        },
        {
          title: "联系人",
          dataIndex: "user",
          align: "center"
        },
        {
          title: "联系电话",
          dataIndex: "tel",
          align: "center"
        },
        {
          title: "评级",
          dataIndex: "rate",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          name: "123供应商",
          area: "南沙区",
          address: "广州市南沙区",
          user: "张三",
          tel: 138552222,
          rate: 1
        }
      ]
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      // this.$api.standing.getSupplierList().then(res => {
      //   this.data = res.data.data;
      //   this.total = res.data.total;
      // });
    },
    onEdit(row) {
      this.modalInfo.show = true;
      this.modalInfo.row = row;
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
    cancel(value) {
      this.modalInfo.show = value;
    }
  }
};
</script>
