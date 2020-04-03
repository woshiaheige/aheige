<template>
  <a-card :bordered="false" class="scheme" title="运维方案">
    <a-button type="primary" @click="editScheme(' ')">添加方案</a-button>

    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="period" slot-scope="period, row">
        <span>{{ row.startTime }}</span
        >至<span>{{ row.endTime }}</span>
      </span>
      <span slot="action" slot-scope="row">
        <a-button @click="editScheme(row)">编辑</a-button>
        <a-button v-margin:left="5">相关站点</a-button>
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
          title: "方案名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "编号",
          dataIndex: "serialNum",
          key: "serialNum"
        },
        {
          title: "方案项数",
          dataIndex: "schemeNum",
          key: "schemeNum"
        },
        {
          title: "使用量",
          dataIndex: "useNum",
          key: "useNum"
        },
        {
          title: "创建人",
          dataIndex: "createdBy",
          key: "createdBy"
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          key: "createdAt"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          name: "可口可乐（199污水)",
          serialNum: "",
          schemeNum: "2",
          useNum: "10",
          createdBy: "马小跳",
          createdAt: "2019-11-15"
        }
      ]
    };
  },
  methods: {
    editScheme(row) {
      this.$router.push({
        path: "/i-maintain/scheme/detail",
        query: { id: row.id }
      });
    },
    getTableData() {
      this.$api.iMaintain.getSchemeList().then(res => {
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
