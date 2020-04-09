<template>
  <a-card :bordered="false" class="enterprise" title="一企一档">
    <a-button type="primary" @click="editEnterprise('')"
      >添加运维企业客户</a-button
    >
    <a-table
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      rowKey="id"
    >
      <span slot="stations" slot-scope="stations">
        <a-button type="primary" size="small" @click="chooseStation(stations)"
          >选择站点</a-button
        >
      </span>
      <span slot="action" slot-scope="row">
        <a @click="editEnterprise(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteEnterprise">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />

    <!-- 新增企业 -->
    <enterprise-new :visible.sync="visible" :enterpriseId="enterpriseId" />
    <!-- 新增企业end -->
  </a-card>
</template>

<script>
import enterpriseNew from "@/components/customer/enterprise-new";
export default {
  components: {
    enterpriseNew
  },
  data() {
    return {
      current: 1,
      total: 1,
      enterpriseId: "",
      visible: false,
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "行政区域",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "站点数量",
          dataIndex: "stationNum",
          key: "stationNum"
        },
        {
          title: "站点",
          key: "stations",
          dataIndex: "stations",
          scopedSlots: { customRender: "stations" }
        },
        {
          title: "运维小组",
          dataIndex: "group",
          key: "group"
        },
        {
          title: "负责人",
          dataIndex: "principal",
          key: "principal"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          key: "1",
          id: "0",
          order: "1",
          name: "腾讯",
          address: "深圳",
          stationNum: "2",
          stations: ["A", "B"],
          group: "小组1",
          principal: "麻花腾"
        }
      ]
    };
  },
  methods: {
    chooseStation(stations) {
      console.log(stations);
    },
    editEnterprise(row) {
      if (row) {
        this.enterpriseId = row.id;
      } else {
        this.enterpriseId = "";
      }
      console.log(this.enterpriseId);
      this.visible = true;
    },
    deleteEnterprise(row) {
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
      this.$api.customer.getEnterPriseList().then(res => {
        if (res.status == 200) {
          console.log(res);
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
