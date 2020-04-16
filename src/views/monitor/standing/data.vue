<template>
  <div>
    <a-card :bordered="false" v-margin:bottom="28">
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-range-picker @change="onChange" placeholder="时间范围" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <a-card :bordered="false">
      <span slot="title">
        <a-icon type="arrow-left" @click="$router.back(-1)" />实时数据
      </span>

      <a-table
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
      tableData: [
        {
          date: "2020-04-25 16:43:00",
          temperature: "30",
          gas: "二氧化碳"
        },
        {
          date: "2020-04-25 16:43:00",
          temperature: "30",
          gas: "二氧化碳"
        }
      ],
      columns: [
        {
          title: "时间",
          dataIndex: "date",
          key: "date",
          align: "center"
        },
        {
          title: "温度",
          dataIndex: "temperature",
          key: "temperature",
          align: "center"
        },
        {
          title: "废气",
          dataIndex: "gas",
          key: "gas",
          align: "center"
        }
      ],
      formInline: {
        name: "",
        type: ""
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
