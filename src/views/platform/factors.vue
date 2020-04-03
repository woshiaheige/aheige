<template>
  <a-card :bordered="false" class="factors" title="监测因子一览表">
    <a-button type="primary" @click="visible = true">添加因子</a-button>

    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="visible = true">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteInstrument(row)">删除</a>
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
          title: "因子名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "编码",
          key: "code",
          dataIndex: "code"
        },
        {
          title: "分类",
          key: "sort",
          dataIndex: "sort"
        },
        {
          title: "检测/速度单位",
          key: "speedUnit",
          dataIndex: "speedUnit"
        },
        {
          title: "排放/总单位",
          key: "totalUnit",
          dataIndex: "totalUnit"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          name: "污水",
          code: "W0000",
          sort: "水",
          speedUnit: "秒/升",
          totalUnit: "立方米"
        }
      ]
    };
  },
  methods: {
    deleteInstrument(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    getTableData() {
      this.$api.platform.getFactorsList().then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
