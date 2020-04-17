<template>
  <div class="standing">
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="输入车牌号(未对接此字段)"></a-input>
        </a-form-item>
        <a-form-item @click="onSubmit" style="float: right">
          <a-button type="primary">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">车辆管理</div>
        <div class="extra">
          <a-button type="success" @click="onEdit('', 'add')">
            <a-icon type="plus" />新增
          </a-button>
        </div>
      </div>
      <a-table
        size="middle"
        :columns="columns"
        :loading="loading"
        rowKey="id"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="onEdit(row, 'edit')">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelect(row)">删除</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :current="current"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
      <modal v-model="modalInfo" @refresh="getTableData"> </modal>
    </a-card>
  </div>
</template>

<script>
import modal from "@/components/standing/car-modal";
export default {
  components: { modal },
  data() {
    return {
      modalInfo: { show: false },
      current: 1,
      loading: false,
      pagesize: 10,
      total: 0,
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          },
          width: 100
        },
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
          width: 200,
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
      let params = {
        pagesize: this.pagesize,
        page: this.current
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
            } else {
              _this.$message.error(res.data.msg);
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
