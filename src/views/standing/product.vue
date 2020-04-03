<template>
  <a-card :bordered="false" class="standing" title="物品管理">
    <!-- <a-button type="primary" slot="extra" @click="edit('', 'add')"
      >新增</a-button
    > -->
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="输入试剂名称" v-model="reagent"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查找
        </a-button>
        <a-button type="primary" v-margin:left="10" @click="edit('', 'add')">
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="edit(row, 'edit')">编辑</a>
        <a-divider type="vertical" />
        <a @click="delect(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :total="total"
      :current="current"
    />
    <modal v-model="modalInfo"> </modal>
  </a-card>
</template>

<script>
import modal from "@/components/standing/product-modal";
export default {
  components: { modal },
  data() {
    return {
      reagent: "",
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
          title: "试剂名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "品牌",
          dataIndex: "brand",
          align: "center"
        },
        {
          title: "型号",
          dataIndex: "type",
          align: "center"
        },
        {
          title: "编码",
          dataIndex: "coding",
          align: "center"
        },
        {
          title: "库存",
          dataIndex: "inventory",
          align: "center"
        },
        {
          title: "单位",
          dataIndex: "unit",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$api.standing.getProductList().then(res => {
        this.data = res.data.data;
        this.total = res.data.total;
      });
    },
    edit(row, type) {
      this.modalInfo = {
        show: true,
        info: row,
        type: type
      };
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
