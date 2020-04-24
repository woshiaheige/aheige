<template>
  <div>
    <a-card :bordered="false"
      ><a-form-model layout="inline" :model="formInline">
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
        <a-form-model-item label="异常时间">
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
        <div class="title">异常列表</div>
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
      </a-table>

      <a-pagination
        size="small"
        :showTotal="total => `共 ${total} 条`"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pagesize"
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
          dataIndex: "enterpriseName"
        },
        {
          title: "监控点名称",
          dataIndex: "pointName"
        },
        {
          title: "异常类型",
          dataIndex: "flag",
          customRender: text => {
            if (text == "F") {
              return "仪器仪表故障";
            } else if (text == "M") {
              return "仪器仪表处于维护期间产生的数据";
            } else if (text == "S") {
              return "手工输入的设定值";
            } else if (text == "D") {
              return "仪器仪表故障";
            } else if (text == "C") {
              return "仪器仪表处于校准状态";
            } else if (text == "T") {
              return "仪器仪表采样数值超过测量上限";
            } else if (text == "B") {
              return "仪器仪表与数采仪通讯异常";
            }
          }
        },
        {
          title: "因子名称",
          dataIndex: "divisorName"
        },
        {
          title: "异常值",
          dataIndex: "rtd"
        },
        {
          title: "异常时间",
          dataIndex: "dateTime",
          width: 200
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
        .getExData(data)
        .then(res => {
          if (res.data.state == 0) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          }
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
