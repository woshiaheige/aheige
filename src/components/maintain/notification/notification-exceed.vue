<template>
  <div>
    <div class="card-header">
      <div class="title">超标数据</div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      columns: [
        {
          title: "因子名称",
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
      ]
    };
  },
  mounted() {
    // this.getTableData();
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
