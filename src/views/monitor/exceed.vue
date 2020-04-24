<template>
  <div>
    <a-card :bordered="false"
      ><a-form-model layout="inline">
        <a-form-model-item label="企业名称">
          <a-input
            v-model="formInline.enterpriseName"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="监控点名称">
          <a-input
            v-model="formInline.pointName"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="MN号码">
          <a-input
            v-model="formInline.mn"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="超标时间">
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item style="float:right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model></a-card
    >
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">超标列表</div>
      </div>
      <a-table
        size="middle"
        :loading="loading"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <template slot="dataType" slot-scope="dataType">
          <a-tag color="green" v-if="dataType == '2051'">分钟数据</a-tag>
          <a-tag color="blue" v-if="dataType == '2061'">小时数据</a-tag>
        </template>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pagesize"
        :showTotal="total => `共 ${total} 条`"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pagesize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "监测点",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "监测因子",
          dataIndex: "divisorName",
          key: "divisorName"
        },
        {
          title: "实时值",
          dataIndex: "rtd",
          key: "rtd"
        },
        {
          title: "上限值",
          dataIndex: "floorval",
          key: "floorval",
          customRender: (text, row) => Number(row.floorval).toFixed(4)
        },
        {
          title: "下限值",
          dataIndex: "ceilval",
          key: "ceilval",
          customRender: (text, row) => Number(row.ceilval).toFixed(4)
        },
        {
          title: "数据类型",
          dataIndex: "dataType",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "dataType" }
        },
        {
          title: "超标时间",
          dataIndex: "dateTime",
          key: "dateTime",
          width: 200,
          align: "center"
        }
      ],
      formInline: {
        enterpriseName: "",
        pointName: "",
        mn: "",
        beginTime: "",
        endTime: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pagesize,
        beginTime: this.formInline.beginTime,
        endTime: this.formInline.endTime,
        enterpriseName: this.formInline.enterpriseName,
        mn: this.formInline.mn,
        pointName: this.formInline.pointName
      };
      this.$api.monitor
        .getWarnData(data)
        .then(res => {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChange(date, dateString) {
      this.formInline.beginTime = dateString[0] + " 00:00:00";
      this.formInline.endTime = dateString[1] + " 23:59:59";
    }
  }
};
</script>
