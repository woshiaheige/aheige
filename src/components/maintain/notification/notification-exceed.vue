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
  props: ["formInline"],
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
  methods: {
    getTableData(formInline) {
      console.log("执行了222");
      this.loading = true;
      let data = {
        beginTime: formInline.beginTime,
        endTime: formInline.endTime,
        mn: formInline.mn
      };
      this.$api.maintain
        .getReportPushDataRateWarnData(data)
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.$bus.$on("todoSth", function(params) {
      //获取传递的参数并进行操作
      //todo something
      console.log(params, 5555);
    });
  }
};
</script>
