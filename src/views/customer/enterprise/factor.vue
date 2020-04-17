<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="因子名称">
          <a-select
            placeholder="请选择"
            v-model="list.divisorId"
            v-width="150"
            allowClear
          >
            <a-select-option
              v-for="item in factorOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查找
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card
      :bordered="false"
      class="station"
      title="监测因子"
      v-margin:top="16"
    >
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
      <add-edit
        :factorOptions="factorOptions"
        v-model="obj"
        @refresh="getTableData"
      ></add-edit>
    </a-card>
  </div>
</template>

<script>
import addEdit from "@/components/customer/enterprise/add-edit-factor";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 1,
      loading: false,
      list: {},
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "因子名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "因子编码",
          dataIndex: "code",
          key: "code",
          align: "center"
        },
        {
          title: "上限",
          dataIndex: "ceilval",
          key: "ceilval",
          align: "center"
        },
        {
          title: "下限",
          dataIndex: "floorval",
          key: "floorval",
          align: "center"
        },
        {
          title: "因子类型",
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
          title: "单位名称",
          dataIndex: "avgUnit",
          key: "avgUnit",
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
          name: "PH",
          num: "DS001",
          max: "10",
          min: "1",
          type: "废水",
          company: "环保局"
        },
        {
          name: "PH",
          num: "DS001",
          max: "10",
          min: "1",
          type: "废气",
          company: "环保局"
        }
      ],
      obj: {
        show: false
      },
      factorOptions: []
    };
  },
  mounted() {
    this.getTableData();
    this.getFactor();
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        pointId: this.$route.query.id,
        divisorId: this.list.divisorId
      };
      this.loading = true;
      this.$api.customer
        .getFactorList(data)
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
            .delFactor({
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
    getFactor() {
      this.$api.common.selectFactor().then(res => {
        if (res.data.state == 0) {
          this.factorOptions = res.data.data;
        }
      });
    }
  }
};
</script>
