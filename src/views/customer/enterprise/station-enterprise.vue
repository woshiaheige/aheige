<template>
  <a-card :bordered="false" class="station">
    <span slot="title">
      <a-icon type="arrow-left" @click="$router.back(-1)" />监控点管理
    </span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="监控点名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="MN号码"></a-input>
      </a-form-item>
      <a-form-item>
        <a-select placeholder="监控点类型" v-width="150">
          <a-select-option> </a-select-option>
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
      size="middle"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      bordered
    >
      <span slot="action" slot-scope="row">
        <a @click="goFactor(row)">监测因子</a>
        <a-divider type="vertical" />
        <a @click="goDevice(row)">监测设备</a>
        <a-divider type="vertical" />
        <a @click="onEdit(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      size="small"
      v-margin:top="16"
      showSizeChanger
      :defaultCurrent="current"
      :defaultPageSize="pageSize"
      :total="total"
    />
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>

<script>
import addEdit from "@/components/customer/station/add-edit-station";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "监控点名称",
          dataIndex: "stationName",
          key: "stationName",
          align: "center"
        },
        {
          title: "所属企业",
          dataIndex: "enterprise",
          key: "enterprise",
          align: "center"
        },
        {
          title: "MN号码",
          dataIndex: "mn",
          key: "mn",
          align: "center"
        },
        {
          title: "传输类型",
          key: "type",
          dataIndex: "type",
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
          stationName: "可口可乐（污水）（CT4406050009301",
          enterprise: "腾讯",
          mn: "52452122",
          type: "类型"
        }
      ],
      obj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      // this.$api.customer.getStationList().then(res => {
      //   if (res.status == 200) {
      //     this.tableData = res.data.data;
      //     this.total = res.data.total;
      //   }
      // });
    },
    goFactor() {
      this.$router.push({
        path: "/customer/enterprise/factor"
      });
    },
    goDevice() {
      this.$router.push({
        path: "/customer/enterprise/device"
      });
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
      console.log(row);
      this.obj.show = true;
      this.obj.row = row;
    },
    cancel(value) {
      this.obj.show = value;
      this.getTableData();
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
