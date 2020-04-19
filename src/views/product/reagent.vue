<template>
  <a-card :bordered="false" class="standing">
    <div class="card-header">
      <div class="title">试剂列表</div>
      <div class="extra">
        <a-form layout="inline" :model="formInline">
          <a-form-item>
            <a-button type="primary" @click="edit('', 'add')">
              <a-icon type="plus" />新建
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="danger" shape="round" @click="warehouseFun('out')">
              <a-icon type="caret-up" />出库
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button
              type="success"
              shape="round"
              @click="warehouseFun('enter')"
            >
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
      size="middle"
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="edit(row, 'edit')">编辑</a>
        <a-divider type="vertical" />
        <a @click="detail(row)">库存详情</a>
        <a-divider type="vertical" />
        <a @click="delect(row)">删除</a>
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
    <warehouse-modal v-model="warehouseInfo"> </warehouse-modal>
    <warehouse-detail v-model="warehouseDetail"> </warehouse-detail>
  </a-card>
</template>

<script>
import modal from "@/components/standing/product-modal";
import warehouseModal from "@/components/standing/warehouse-modal";
import warehouseDetail from "@/components/standing/warehouse-detail";
export default {
  components: { modal, warehouseModal, warehouseDetail },
  data() {
    return {
      reagent: "",
      modalInfo: { show: false },
      warehouseInfo: { show: false },
      warehouseDetail: { show: false, info: { name: "" } },
      current: 1,
      total: 0,
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
          dataIndex: "coding"
        },
        {
          title: "库存",
          dataIndex: "inventory"
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
    },
    warehouseFun(type) {
      console.log(type);
      this.warehouseInfo = {
        show: true,
        type: type
      };
    },
    detail(row) {
      console.log(row);
      this.warehouseDetail = {
        show: true,
        info: row
      };
    }
  }
};
</script>
