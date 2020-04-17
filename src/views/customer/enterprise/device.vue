<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="设备名称" v-model="list.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="生产厂家" v-model="list.manufacturer"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="设备型号" v-model="list.number"></a-input>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查找
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="device" title="监测设备" v-margin:top="16">
      <a-button type="primary" @click="onEdit('add')" slot="extra">
        <a-icon type="plus" />新建
      </a-button>
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
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
        :defaultCurrent="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
      <add-edit v-model="obj" @refresh="getTableData"></add-edit>
    </a-card>
  </div>
</template>

<script>
import addEdit from "@/components/customer/enterprise/add-edit-device";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      loading: false,
      list: {
        manufacturer: "",
        name: "",
        number: ""
      },
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "设备名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "生产厂家",
          dataIndex: "manufacturer",
          key: "manufacturer",
          align: "center"
        },
        {
          title: "设备型号",
          dataIndex: "number",
          key: "number",
          align: "center"
        },
        {
          title: "设备类型",
          dataIndex: "type",
          key: "type",
          align: "center",
          customRender: text => {
            if (text == "31") {
              return "气类";
            } else if (text == "32") {
              return "水类";
            }
          }
        },
        {
          title: "验收时间",
          key: "gmtReceptionTime",
          dataIndex: "gmtReceptionTime",
          align: "center"
        },
        {
          title: "验收材料",
          key: "downLoad",
          scopedSlots: { customRender: "downLoad" },
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [],
      obj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        pointId: this.$route.query.id,
        manufacturer: this.list.manufacturer,
        name: this.list.name,
        number: this.list.number
      };
      this.loading = true;
      this.$api.customer
        .getDeviceList(data)
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
    onEdit(type, row) {
      this.obj.show = true;
      this.obj.type = type;
      this.obj.row = row;
    },
    onDown(row) {
      console.log(row);
      if (row.fileId == null) {
        this.$message.warn("没有附件");
        return;
      }
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
