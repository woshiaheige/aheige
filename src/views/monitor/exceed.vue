<template>
  <div>
    <a-card :bordered="false"
      ><a-form-model layout="inline">
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
        <a-form-model-item label="超标时间">
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
          align: "center",
          title: "序号",
          width: 100,
          customRender: (_, __, index) => {
            return (
              <span>{index + (this.current - 1) * this.pageSize + 1}</span>
            );
          }
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "监控点名称",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "MN号",
          dataIndex: "mn",
          key: "mn"
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
        range: [this.$moment(), this.$moment()]
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //重置表单事件
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
    }
  }
};
</script>
