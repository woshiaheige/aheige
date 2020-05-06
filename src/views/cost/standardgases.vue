<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="监控点名称">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="设备名称">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="出库时间">
          <a-range-picker
            :allowClear="false"
            @change="onChange"
            format="YYYY-MM-DD"
            v-model="list.range"
          />
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="enterprise" v-margin:top="16">
      <div class="card-header">
        <div class="title">出库详情</div>
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
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "监控点名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "品牌",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "型号",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "数量",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "单位",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "出库时间",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "总价",
          dataIndex: "name",
          key: "name"
        }
      ],
      tableData: [],
      list: {
        name: "",
        level: "",
        type: ""
      }
    };
  },
  mounted() {
    this.getTableData();
    this.getIndustrySelect();
  },
  methods: {
    reset() {
      this.list = { name: "", level: "", type: "" };
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseName: this.list.name,
        controlLevel: this.list.level,
        industryId: this.list.type
      };
      this.loading = true;
      this.$api.customer
        .getEnterPriseList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            let result = res.data.data;
            result.records.forEach(item => {
              this.typeList.forEach(element => {
                if (item.industryId == element.id) {
                  item.industry = element.name;
                }
              });
            });
            this.tableData = result.records;
            this.total = Number(result.total);
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>
