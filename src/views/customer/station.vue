<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="企业名称" v-model="list.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="监控点名称" v-model="list.pointName"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="MN号码" v-model="list.mn"></a-input>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="监控点类型" v-width="150" v-model="list.type">
            <a-select-option
              v-for="item in pointOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
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
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      :loading="loading"
      v-margin:top="16"
    >
      <a-button
        slot="extra"
        type="primary"
        v-margin:left="10"
        @click="onEdit('add')"
      >
        新增
      </a-button>
      <a-table
        rowKey="id"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <span slot="action" slot-scope="row">
          <a @click="goFactor(row)">监测因子</a>
          <a-divider type="vertical" />
          <a @click="goDevice(row)">监测设备</a>
          <a-divider type="vertical" />
          <a @click="onEdit('edit', row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
      </a-table>

      <a-pagination
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
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "所属企业",
          dataIndex: "enterpriseName",
          key: "enterpriseName",
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
          key: "transferType",
          dataIndex: "transferType",
          align: "center",
          customRender: text => {
            if (text == "1") {
              return "无线传输";
            } else if (text == "2") {
              return "有线传输";
            }
          }
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
      },
      list: {
        name: "",
        pointName: "",
        mn: ""
      },
      loading: false,
      pointOptions: [
        {
          name: "水类",
          value: 1
        },
        {
          name: "气类",
          value: 2
        }
      ]
    };
  },
  mounted() {
    this.getTableData();
    this.getPointSelect();
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        type: this.list.type,
        enterpriseName: this.list.name,
        pointName: this.list.pointName,
        mn: this.list.mn
      };
      this.loading = true;
      this.$api.customer
        .getStationList(data)
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
    //监测点类型下拉
    getPointSelect() {
      let params = ["SYS_POINT_TYPE"];
      this.$api.common.geDictByParam(params).then(res => {
        this.pointOptions = res.data;
      });
    },
    goFactor() {
      this.$router.push({
        path: "/customer/station/factor"
      });
    },
    goDevice() {
      this.$router.push({
        path: "/customer/station/device"
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
    onEdit(type, row) {
      this.obj.show = true;
      this.obj.type = type;
      this.obj.row = row;
    }
  }
};
</script>
