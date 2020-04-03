<template>
  <a-card :bordered="false" class="realtime" title="实时动态">
    <a-form layout="inline">
      <a-form-item>
        <a-select
          placeholder="选择企业"
          v-width="150"
          v-model="searchOpt.enterprise"
        >
          <a-select-option
            :value="item"
            v-for="(item, index) of enterprise"
            :key="index"
          >
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查找
        </a-button>
      </a-form-item>
    </a-form>

    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />

    <station-period :visible.sync="visible" />
  </a-card>
</template>

<script>
import stationPeriod from "@/components/customer/station/station-period";
export default {
  components: { stationPeriod },
  data() {
    return {
      current: 1,
      total: 1,
      visible: false,
      enterprise: [],
      group: [],
      searchOpt: {
        station: ""
      },
      columns: [
        {
          dataIndex: "order",
          key: "order",
          title: "序号"
        },
        {
          title: "区域",
          dataIndex: "area",
          key: "area"
        },
        {
          title: "企业名称",
          dataIndex: "enterprise",
          key: "enterprise"
        },
        {
          title: "监测点",
          dataIndex: "point",
          key: "point"
        },
        {
          title: "数据更新时间",
          key: "updatedAt",
          dataIndex: "updatedAt"
        },
        {
          title: "联网状态",
          dataIndex: "networkingStatus",
          key: "networkingStatus"
        }
      ],
      tableData: [
        {
          id: 0,
          order: "1",
          area: "",
          enterprise: "腾讯",
          point: "",
          updatedAt: "2019-9-20 11:20:15",
          networkingStatus: "在线"
        }
      ]
    };
  },
  methods: {
    selectPeriod(period) {
      console.log(period);
      this.visible = true;
    },
    getTableData() {
      this.$api.iMaintain.getRealtimeList().then(res => {
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
