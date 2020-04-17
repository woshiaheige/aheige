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
        size="middle"
        bordered
        rowKey="id"
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
          dataIndex: "pointName",
          key: "pointName",
          align: "center"
        },
        {
          title: "分钟数据数",
          dataIndex: "minDataCount",
          key: "minDataCount",
          align: "center"
        },
        {
          title: "小时数据数",
          dataIndex: "hourDataCount",
          key: "hourDataCount",
          align: "center"
        },
        {
          title: "日数据数",
          dataIndex: "dayDataCount",
          key: "dayDataCount",
          align: "center"
        },
        {
          title: "应收条数",
          dataIndex: "oughtCount",
          key: "oughtCount",
          align: "center"
        },
        {
          title: "实收条数",
          dataIndex: "realCount",
          key: "realCount",
          align: "center"
        },
        {
          title: "实收条数",
          dataIndex: "proCount",
          key: "proCount",
          align: "center"
        }
      ],
      formInline: {
        enterpriseName: "",
        pointName: "",
        mn: ""
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
