<template>
  <a-card :bordered="false" class="standing">
    <div class="card-header">
      <div class="title">车辆列表</div>
      <div class="extra">
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" @click="onEdit('', 'add')">
              <a-icon type="plus" />新建
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-input-search
              placeholder="请输入车牌号码"
              style="width: 200px"
              @search="onSubmit"
              v-model="formInline.number"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="tableData">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card
          :title="item.number"
          :headStyle="{ background: '#2d8cf0', color: '#ffffff' }"
        >
          <template class="ant-card-actions" slot="actions">
            <span key="edit" @click="onEdit(item, 'edit')">编辑</span>
            <span key="delete" @click="onDelect(item)" v-color="'#ed4014'"
              >删除</span
            >
          </template>
          <p>车辆品牌：{{ item.model }}</p>
          <p>GPS设备号：{{ item.gps }}</p>
          <p>车架号：{{ item.frameNumber }}</p>
        </a-card>
      </a-list-item>
    </a-list>

    <a-pagination
      size="small"
      v-margin:top="16"
      showSizeChanger
      :total="total"
      :showTotal="total => `共 ${total} 条`"
      :current="current"
      :defaultPageSize="size"
      :pageSizeOptions="pageSizeOptions"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
    <modal v-model="modalInfo" @refresh="getTableData"> </modal>
  </a-card>
</template>

<script>
import modal from "@/components/car/car-modal";
export default {
  components: { modal },
  data() {
    return {
      modalInfo: { show: false },
      formInline: {
        number: ""
      },
      current: 1,
      loading: false,
      size: 8,
      total: 0,
      pageSizeOptions: ["8", "16", "24", "32", "40"],
      columns: [
        {
          title: "车辆",
          dataIndex: "number",
          align: "center"
        },
        {
          title: "车架号",
          dataIndex: "frameNumber",
          align: "center"
        },
        {
          title: "品牌型号",
          dataIndex: "model",
          align: "center"
        },
        {
          title: "GPS设备号",
          dataIndex: "gps",
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
    sizechange(current, size) {
      this.current = 1;
      this.size = size;
      this.getTableData();
    },
    getTableData() {
      let params = {
        size: this.size,
        page: this.current,
        number: this.formInline.number
      };
      this.loading = true;
      this.$api.car
        .getCarList(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    onEdit(row, type) {
      this.modalInfo = {
        show: true,
        type: type,
        detail: ""
      };
      if (type == "edit") {
        this.$api.car.getAssetVehicleById({ id: row.id }).then(res => {
          if (res.data.state == 0) {
            this.modalInfo = {
              show: true,
              type: type,
              detail: res.data.data
            };
          }
        });
      }
    },
    onDelect(row) {
      let _this = this;
      this.$confirm({
        title: "确定删除" + row.number + "吗?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          _this.$api.car.deleteAssetVehicle({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("删除成功");
              _this.getTableData();
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
