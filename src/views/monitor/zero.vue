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
            placeholder="请输入"
            :maxLength="30"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="MN号">
          <a-input
            v-model="formInline.mn"
            placeholder="请输入"
            :maxLength="30"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-model-item label="异常时间">
          <a-range-picker
            :allowClear="false"
            v-model="formInline.range"
            format="YYYY-MM-DD"
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
        <div class="title">零值列表</div>
      </div>
      <a-table
        bordered
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
        :showTotal="total => `共 ${total} 条`"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pageSize"
        :current="current"
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
          dataIndex: "enterpriseName"
        },
        {
          title: "监控点名称",
          dataIndex: "pointName"
        },
        {
          title: "MN号",
          dataIndex: "mn",
          key: "mn"
        },
        {
          title: "因子名称",
          dataIndex: "divisorName"
        },
        {
          title: "时间",
          dataIndex: "dateTime",
          align: "center",
          width: 200
        }
      ],
      formInline: {
        enterpriseName: "",
        pointName: "",
        mn: "",
        range: [this.$moment(), this.$moment()]
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
    getTableData() {
      this.loading = true;
      let data = {
        page: this.current,
        size: this.pageSize,
        beginTime: this.formInline.range[0].format("YYYY-MM-DD") + " 00:00:00",
        endTime: this.formInline.range[1].format("YYYY-MM-DD") + " 23:59:59",
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
    }
  }
};
</script>
