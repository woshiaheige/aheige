<template>
  <a-card :bordered="false" class="standing" title="传输速率">
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
          poiName: "中林木业-废气站房",
          enterpriseName: "中林集团莆田国林木业城",
          areaName: "莆田市",
          hourRealCount: "30",
          hourOughtCount: "15",
          minRealCount: "65",
          minOughtCount: "50",
          dataTime: "2019-05-02~2020-05-01"
        },
        {
          poiName: "豪华陶瓷-废气站房",
          enterpriseName: "中林集团莆田国林木业城",
          areaName: "莆田市",
          hourRealCount: "29",
          hourOughtCount: "14",
          minRealCount: "70",
          minOughtCount: "48",
          dataTime: "2019-05-02~2020-05-01"
        }
      ],
      columns: [
        {
          title: "时间",
          dataIndex: "dataTime",
          key: "dataTime",
          align: "center"
        },
        {
          title: "企业",
          dataIndex: "enterpriseName",
          key: "enterpriseName",
          align: "center"
        },
        {
          title: "监控点",
          dataIndex: "poiName",
          key: "poiName",
          align: "center"
        },
        {
          title: "分钟应收",
          dataIndex: "minOughtCount",
          key: "minOughtCount",
          align: "center"
        },
        {
          title: "分钟实收",
          dataIndex: "minRealCount",
          key: "minRealCount",
          align: "center"
        },
        {
          title: "小时应收",
          dataIndex: "hourOughtCount",
          key: "hourOughtCount",
          align: "center"
        },
        {
          title: "小时实收",
          dataIndex: "hourRealCount",
          key: "hourRealCount",
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
