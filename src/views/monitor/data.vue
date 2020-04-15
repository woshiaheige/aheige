<template>
  <a-card :bordered="false" class="standing" title="监测数据">
    <a-layout>
      <a-layout-sider><left-tree></left-tree></a-layout-sider>
      <a-layout-content>
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
