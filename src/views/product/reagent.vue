<template>
  <a-card :bordered="false" class="standing">
    <div class="card-header">
      <div class="title">试剂列表</div>
      <div class="extra">
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" @click="onEdit('', 'add')">
              <a-icon type="plus" />新建
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="danger" shape="round" @click="onStock('out')">
              <a-icon type="caret-up" />出库
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="success" shape="round" @click="onStock('enter')">
              <a-icon type="caret-down" />入库
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-input-search
              placeholder="输入试剂名称"
              style="width: 200px"
              v-model="reagent"
              @search="onSubmit"
            />
          </a-form-item>
        </a-form>
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
      <span slot="action" slot-scope="row">
        <a @click="onEdit(row, 'edit')">编辑</a>
        <a-divider type="vertical" />
        <a @click="onDetail(row)">库存详情</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      size="small"
      v-margin:top="16"
      showSizeChanger
      :defaultCurrent="current"
      :pageSize.sync="pageSize"
      :total="total"
      :showTotal="total => `共 ${total} 条`"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
    <add-edit v-model="addInfo"> </add-edit>
    <out-in v-model="stockInfo"> </out-in>
    <detail-modal v-model="detailInfo"> </detail-modal>
  </a-card>
</template>

<script>
import addEdit from "@/components/product/reagent/add-edit";
import outIn from "@/components/product/reagent/out-in";
import detailModal from "@/components/product/reagent/detail";
export default {
  components: { addEdit, outIn, detailModal },
  data() {
    return {
      reagent: "",
      addInfo: { show: false },
      stockInfo: { show: false },
      detailInfo: { show: false, info: { name: "" } },
      current: 1,
      pageSize: 10,
      total: 1,
      loading: false,
      columns: [
        {
          title: "试剂名称",
          dataIndex: "name"
        },
        {
          title: "品牌",
          dataIndex: "brand"
        },
        {
          title: "型号",
          dataIndex: "type"
        },
        {
          title: "编码",
          dataIndex: "number"
        },
        {
          title: "库存",
          dataIndex: "goodsCount"
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
      tableData: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize
      };
      this.loading = true;
      this.$api.product
        .getGoodsList(data)
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
            .delDevice({
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
    onEdit(row, type) {
      this.addInfo = {
        show: true,
        row: row,
        type: type
      };
    },
    onStock(type) {
      this.stockInfo = {
        show: true,
        type: type
      };
    },
    onDetail(row) {
      this.detailInfo = {
        show: true,
        row: row
      };
    }
  }
};
</script>
