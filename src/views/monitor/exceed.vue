<template>
  <a-card :bordered="false" class="standing" title="超标数据">
    <a-form-model layout="inline" :model="formInline">
      <a-form-model-item>
        <a-input placeholder="企业名称" />
      </a-form-model-item>
      <a-form-model-item>
        <a-range-picker placeholder="时间范围" />
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
      <span slot="action">
        <a>现场图片</a>
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
          regionName: "泉州市",
          enterpriseName: "豪华陶瓷有限公司",
          pointName: "废气站房",
          busId: "20200326170029934",
          divisorCode: "a21002",
          divisorName: "氮氧化物",
          floorval: "0.0000",
          ceilval: "0.1000",
          dateTime: "2020-03-26 16:00:00",
          rtd: "0.3802",
          flag: "N",
          overproofMultiple: 2.8
        },
        {
          regionName: "泉州市",
          enterpriseName: "豪华陶瓷有限公司",
          pointName: "废气站房",
          busId: "20200326170029934",
          divisorCode: "a01014",
          divisorName: "烟气湿度",
          floorval: "0.0000",
          ceilval: "4.0000",
          dateTime: "2020-03-26 16:00:00",
          rtd: "4.5764",
          flag: "N",
          overproofMultiple: 0.14
        }
      ],
      columns: [
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
        name: "",
        type: ""
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
