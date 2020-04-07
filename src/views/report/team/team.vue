<template>
  <a-card :bordered="false" class="report" title="小组汇总">
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      :expandedRowKeys="['0']"
    >
      <span slot="peopleNum" slot-scope="_, row">
        {{ row.people.length }}
      </span>
      <span slot="people" slot-scope="_, row">
        <span v-margin="10" v-for="(item, index) of row.people" :key="index">{{
          item
        }}</span>
      </span>
      <span slot="action" slot-scope="row">
        <a @click="viewTeam(row)">查看</a>
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
          title: "小组名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "小组编码",
          dataIndex: "code",
          key: "code"
        },
        {
          title: "负责站点数",
          dataIndex: "stationNum",
          key: "stationNum"
        },
        {
          title: "人员数量",
          dataIndex: "peopleNum",
          key: "peopleNum",
          scopedSlots: { customRender: "peopleNum" }
        },
        {
          title: "人员名称",
          key: "people",
          dataIndex: "people",
          scopedSlots: { customRender: "people" }
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
          code: "12345678",
          name: "南海A组",
          stationNum: "20",
          people: ["张三", "李四", "王五", "马六", "关羽", "张飞"]
        }
      ]
    };
  },
  methods: {
    viewTeam() {
      this.$router.push({ path: "/report/team/detail" });
    },
    getTableData() {
      this.$api.report.getTeamList().then(res => {
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
