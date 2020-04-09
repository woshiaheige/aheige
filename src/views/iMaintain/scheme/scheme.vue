<template>
  <a-card :bordered="false" class="scheme" title="运维方案">
    <a-button type="primary" @click="editScheme(' ')">添加方案</a-button>

    <a-table
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="gmtCreate" slot-scope="gmtCreate">
        {{ $moment(gmtCreate).format("YYYY-MM-DD") }}
      </span>
      <span slot="action" slot-scope="_, row">
        <a-button size="small" @click="editScheme(row)">编辑</a-button>
        <a-button size="small" v-margin:left="5">相关站点</a-button>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      total: 1,
      loading: true,
      pagesize: 10,
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
          dataIndex: "number",
          key: "number"
        },
        {
          title: "方案项数",
          dataIndex: "planItemCount",
          key: "planItemCount"
        },
        {
          title: "使用量",
          dataIndex: "usageCount",
          key: "usageCount"
        },
        {
          title: "创建人",
          dataIndex: "userName",
          key: "userName"
        },
        {
          title: "创建时间",
          dataIndex: "gmtCreate",
          key: "gmtCreate",
          scopedSlots: { customRender: "gmtCreate" }
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: []
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
      //获取方案列表
      let params = {
        page: this.current,
        size: this.pagesize
      };
      this.$api.iMaintain
        .maintainProgramme(params)
        .then(res => {
          if (res.data.state == 0) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.tableData = [];
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
