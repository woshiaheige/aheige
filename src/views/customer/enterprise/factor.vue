<template>
  <div>
    <a-card :bordered="false" class="station">
      <div class="card-header">
        <div class="title">
          {{ $route.query.enterpriseName + " / " + $route.query.pointName }}
        </div>
        <div class="extra">
          <a-form layout="inline">
            <a-form-item>
              <a-button type="primary" @click="onEdit('add')">
                <a-icon type="plus" />添加
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-select
                placeholder="请选择因子"
                showSearch
                v-model="list.divisorId"
                v-width="150"
                :filterOption="filterOptions"
              >
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option
                  v-for="item in factorOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
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
        <template slot="type" slot-scope="type">
          <a-tag color="blue" v-if="type == 32">水类</a-tag>
          <a-tag color="red" v-if="type == 31">气类</a-tag>
          <a-tag color="green" v-if="type != 31 && type != 32">其他</a-tag>
        </template>
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
        :current="current"
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
      list: { divisorId: "" },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        );
      },
      columns: [
        {
          title: "因子名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "因子编码",
          dataIndex: "code",
          key: "code"
        },
        {
          title: "上限",
          dataIndex: "ceilval",
          key: "ceilval"
        },
        {
          title: "下限",
          dataIndex: "floorval",
          key: "floorval"
        },
        {
          title: "因子类型",
          dataIndex: "type",
          key: "type",
          align: "center",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "单位名称",
          dataIndex: "avgUnit",
          key: "avgUnit"
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
    this.getFactor(this.$route.query.id);
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
    getFactor(pointId) {
      this.$api.common.selectFactorByPointId({ pointId: pointId }).then(res => {
        if (res.data.state == 0) {
          this.factorOptions = res.data.data;
        }
      });
      // this.$api.common.selectFactor().then(res => {
      //   if (res.data.state == 0) {
      //     this.factorOptions = res.data.data;
      //   }
      // });
    }
  }
};
</script>
