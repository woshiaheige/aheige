<template>
  <a-card :bordered="false" class="station" title="站点管理">
    <a-form layout="inline">
      <a-form-item>
        <a-select
          placeholder="选择客户企业"
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
        <a-select
          placeholder="选择运维小组"
          v-width="150"
          v-model="searchOpt.group"
        >
          <a-select-option
            :value="item"
            v-for="(item, index) of group"
            :key="index"
          >
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="站点名称、编号"
          v-model="searchOpt.station"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查找
        </a-button>
        <a-button type="primary" v-margin:left="10" @click="toDetail">
          新增
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
      <span slot="period">
        <span>2020-1-10 11:22</span>&nbsp;至&nbsp;<span>2020-1-15 11:22</span>
      </span>
      <span slot="action">
        <a-button size="small" @click="selectPeriod()">选择周期</a-button>
      </span>
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
        // enterprise:"",
        // group:"",
        station: ""
      },
      columns: [
        {
          dataIndex: "order",
          key: "order",
          title: "序号"
        },
        {
          title: "站点名称（编号）",
          dataIndex: "stationName",
          key: "stationName"
        },
        {
          title: "企业名称",
          dataIndex: "enterprise",
          key: "enterprise"
        },
        {
          title: "维护方案",
          dataIndex: "project",
          key: "project"
        },
        {
          title: "运维小组",
          key: "group",
          dataIndex: "group"
        },
        {
          title: "暂停运营周期",
          dataIndex: "period",
          key: "period",
          scopedSlots: { customRender: "period" }
        },

        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          id: 0,
          order: "1",
          stationName: "可口可乐（污水）（CT4406050009301",
          enterprise: "腾讯",
          project: "方案1",
          group: "运维组1"
        }
      ]
    };
  },
  methods: {
    toDetail() {
      this.$router.push({ path: "/customer/station/detail" });
    },
    selectPeriod(period) {
      console.log(period);
      this.visible = true;
    },
    getTableData() {
      this.$api.customer.getStationList().then(res => {
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
