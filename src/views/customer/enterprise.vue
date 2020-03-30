<template>
  <a-card :bordered="false" class="enterprise" title="一企一档">
    <a-button type="primary" @click="visible = true">添加运维企业客户</a-button>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="stations" slot-scope="stations">
        <a-button type="primary" size="small" @click="chooseStation(stations)"
          >选择站点</a-button
        >
      </span>
      <span slot="action">
        <a @click="editEnterprise">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteEnterprise">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="3"
      :total="500"
    />

    <!-- 新增企业 -->
    <enterprise-new :visible.sync="visible" />
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
    editEnterprise() {
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
    }
  }
};
</script>
