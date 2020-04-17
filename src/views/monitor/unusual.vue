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
    <a-card :bordered="false" title="异常数据">
      <a-table
        size="middle"
        bordered
        :loading="loading"
        rowKey="pointId"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">实时数据</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        :showTotal="total => `共 ${total} 条`"
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
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          align: "center"
        },
        {
          title: "监控点名称",
          dataIndex: "name",
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
    getTableData() {},
    onChange(date, dateString) {
      this.formInline.beginTime = dateString[0] + " 00:00:00";
      this.formInline.endTime = dateString[1] + " 23:59:59";
    }
  }
};
</script>
