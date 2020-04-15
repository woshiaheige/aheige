<template>
  <a-card :bordered="false" class="standing" title="数据报表">
    <a-layout>
      <a-layout-sider><left-tree></left-tree></a-layout-sider>
      <a-layout-content>
        <a-form-model layout="inline" :model="formInline">
          <a-form-model-item>
            <a-range-picker />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
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
      </a-layout-content>
    </a-layout>
  </a-card>
</template>

<script>
import leftTree from "@/components/common/left-tree.vue";
export default {
  components: { leftTree },
  data() {
    return {
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [
        {
          id: "1",
          date: "2020-04-14 00:00:00",
          codstate: "17.2253",
          anitrogen: "0.0191",
          pHstate: "6"
        },
        {
          id: "2",
          date: "2020-04-14 00:00:00",
          codstate: "17.2253",
          anitrogen: "0.0191",
          pHstate: "6"
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
          title: "COD(mg/L)",
          dataIndex: "codstate",
          key: "codstate",
          align: "center"
        },
        {
          title: "氨氮(mg/L)",
          dataIndex: "anitrogen",
          key: "anitrogen",
          align: "center"
        },
        {
          title: "PH",
          dataIndex: "pHstate",
          key: "pHstate",
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
