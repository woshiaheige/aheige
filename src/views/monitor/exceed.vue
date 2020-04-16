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
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model></a-card
    >
    <a-card :bordered="false" title="超标数据">
      <a-table
        size="middle"
        :loading="loading"
        bordered
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action">
          <a>现场图片</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pageSize"
        :defaultCurrent="current"
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
          title: "监测点",
          dataIndex: "pointName",
          key: "pointName",
          align: "center"
        },
        {
          title: "监测因子",
          dataIndex: "divisorName",
          key: "divisorName",
          align: "center"
        },
        {
          title: "实时值",
          dataIndex: "rtd",
          key: "rtd",
          align: "center"
        },
        {
          title: "上限值",
          dataIndex: "floorval",
          key: "floorval",
          align: "center"
        },
        {
          title: "下限值",
          dataIndex: "ceilval",
          key: "ceilval",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
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
    this.getWarnData();
  },
  methods: {
    getWarnData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pageSize,
        beginTime: this.formInline.beginTime,
        endTime: this.formInline.endTime,
        enterpriseName: this.formInline.enterpriseName,
        mn: this.formInline.mn,
        pointName: this.formInline.pointName
      };
      this.$api.monitor
        .getWarnData(data)
        .then(res => {
          console.log(res);
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
