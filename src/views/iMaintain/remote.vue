<template>
  <a-card :bordered="false" class="remote" title="远程控制">
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a-button @click="row">重启</a-button>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      total: 1,
      visible: false,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "所属仪器",
          dataIndex: "instrument",
          key: "instrument"
        },
        {
          title: "所属站点",
          dataIndex: "station",
          key: "station"
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "软件版本",
          dataIndex: "softwareVersion",
          key: "softwareVersion"
        },
        {
          title: "硬件版本",
          dataIndex: "hardwareVersion",
          key: "hardwareVersion"
        },
        {
          title: "远程重启",
          key: "action",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "设备反控",
          dataIndex: "control",
          key: "control"
        },
        {
          title: "获取时间",
          dataIndex: "createdAt",
          key: "createdAt"
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          instrument: "在线烟气分析仪",
          station: "可口可乐（站点）",
          status: "",
          softwareVersion: "",
          hardwareVersion: "",
          control: "",
          createdAt: "2020-10-15 14:20:11"
        }
      ]
    };
  },
  methods: {}
};
</script>
