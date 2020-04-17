<template>
  <div>
    <a-card :bordered="false" v-margin:bottom="28"
      ><a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-input v-model="formInline.enterpriseName" placeholder="企业名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.pointName" placeholder="监控点名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.mn" placeholder="MN号码" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model></a-card
    >
    <a-card :bordered="false" title="数据报表">
      <a-table
        :loading="loading"
        size="middle"
        bordered
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">监测数据</a>
        </span>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pageSize"
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
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          title: "序号",
          align: "center",
          dataIndex: "index",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName",
          align: "center"
        },
        {
          title: "监控点名称",
          dataIndex: "poiName",
          key: "poiName",
          align: "center"
        },
        {
          title: "分钟数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "minOughtCount",
              key: "minOughtCount",
              align: "center"
            },
            {
              title: "实收条数",
              dataIndex: "minRealCount",
              key: "minRealCount",
              align: "center"
            },
            {
              title: "数据完整率",
              dataIndex: "minPro",
              key: "minPro",
              align: "center"
            }
          ]
        },
        {
          title: "小时数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "hourOughtCount",
              key: "hourOughtCount",
              align: "center"
            },
            {
              title: "实收条数",
              dataIndex: "hourRealCount",
              key: "hourRealCount",
              align: "center"
            },
            {
              title: "数据完整率",
              dataIndex: "hourPro",
              key: "hourPro",
              align: "center"
            }
          ]
        },
        {
          title: "日数据数",
          children: [
            {
              title: "应收条数",
              dataIndex: "dayOughtCount",
              key: "dayOughtCount",
              align: "center"
            },
            {
              title: "实收条数",
              dataIndex: "dayRealCount",
              key: "dayRealCount",
              align: "center"
            },
            {
              title: "数据完整率",
              dataIndex: "dayPro",
              key: "dayPro",
              align: "center"
            }
          ]
        }
      ],
      formInline: {
        enterpriseName: "",
        pointName: "",
        mn: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //获取报表数据
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pageSize,
        enterpriseName: this.formInline.enterpriseName,
        mn: this.formInline.mn,
        pointName: this.formInline.pointName
      };
      this.$api.monitor
        .getReportData(data)
        .then(res => {
          if (res.data.state == 0) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.records || [];
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
