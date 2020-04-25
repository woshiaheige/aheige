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
  watch: {
    form: {
      deep: true,
      handler: function(nval) {
        console.log(nval, 5555511);
        // this.formInline = {
        //   mm: nval.mn,
        //   beginTime: nval.beginTime,
        //   endTime: nval.endTime
        // };

        this.getTableData();
      }
    }
  },
  computed: {
    form: {
      get() {
        if (this.formInline.show) {
          return this.formInline;
        } else {
          return { show: false };
        }
      }
    }
  },
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
    getTableData() {
      console.log("执行了");
      this.loading = true;
      let data = {
        index: 1,
        size: 999,
        beginTime: this.formInline.beginTime,
        endTime: this.formInline.endTime,
        mn: this.formInline.mn
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
