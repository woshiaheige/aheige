<template>
  <div>
    <a-card :bordered="false"
      ><a-form-model layout="inline" :model="formInline">
        <a-form-model-item label="企业名称">
          <a-input
            v-model="formInline.enterpriseName"
            :maxLength="30"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="监控点名称">
          <a-input
            v-model="formInline.pointName"
            :maxLength="30"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="MN号">
          <a-input
            v-model="formInline.mn"
            :maxLength="30"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="数据时间">
          <a-range-picker
            :allowClear="false"
            format="YYYY-MM-DD"
            v-model="formInline.range"
            @change="onChange"
          />
        </a-form-model-item>
        <a-form-model-item style="float: right">
          <a-button @click="onReset">
            重置
          </a-button>
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
        <div class="title">数据报表</div>
      </div>
      <a-table
        :loading="loading"
        size="middle"
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
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "监控点名称",
          dataIndex: "poiName",
          key: "poiName"
        },
        {
          title: "MN号",
          dataIndex: "mn",
          key: "mn"
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
        },
        {
          title: "数据时间",
          dataIndex: "dataTime",
          align: "center",
          width: 200
        }
      ],
      formInline: {
        enterpriseName: "",
        pointName: "",
        mn: "",
        range: [
          this.$moment().subtract(1, "days"),
          this.$moment().subtract(1, "days")
        ]
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onReset() {
      this.formInline = {
        enterpriseName: "",
        pointName: "",
        mn: "",
        range: [this.$moment(), this.$moment()]
      };
    },
    onChange(date, dateString) {
      if (
        this.$moment(
          dateString[1] + " 23:59:59",
          "YYYY-MM-DD HH:mm:ss"
        ).valueOf() >
        this.$moment(dateString[0] + " 23:59:59", "YYYY-MM-DD HH:mm:ss")
          .add(2, "days")
          .valueOf()
      ) {
        this.formInline.range[1] = this.$moment(
          dateString[0] + " 23:59:59",
          "YYYY-MM-DD HH:mm:ss"
        ).add(2, "days");
      } else {
        this.formInline.range[1] = date[1];
      }
    },
    //获取报表数据
    getTableData() {
      this.loading = true;
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseName: this.formInline.enterpriseName,
        mn: this.formInline.mn,
        pointName: this.formInline.pointName,
        startTime: this.formInline.range[0].format("YYYY-MM-DD") + " 00:00:00",
        endTime: this.formInline.range[1].format("YYYY-MM-DD") + " 23:59:59"
      };
      this.$api.monitor
        .getReportData(data)
        .then(res => {
          if (res.data.state == 0) {
            this.total = Number(res.data.data.total);
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
