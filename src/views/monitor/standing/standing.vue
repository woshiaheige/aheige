<template>
  <div>
    <a-page-header title="监测数据" :breadcrumb="{ props: { routes } }" />
    <a-card :bordered="false" v-margin:bottom="28">
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-input
            v-model.trim="formInline.enterpriseName"
            placeholder="企业名称"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.pointName" placeholder="监控点名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            placeholder="控制级别"
            v-width="150"
            showSearch
            :filterOption="filterOption"
            @change="onLevelChange"
          >
            <a-select-option value="1">国控</a-select-option>
            <a-select-option value="2">省控</a-select-option>
            <a-select-option value="3">市控</a-select-option>
            <a-select-option value="4">县控</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getTableData">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" title="监测数据">
      <a-table
        size="middle"
        bordered
        :loading="loading"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">实时数据</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        :showTotal="total => `共 ${total} 条`"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pageSize"
        :defaultCurrent="current"
        :total="total"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path: "standing",
          breadcrumbName: "监测数据"
        }
      ],
      loading: false,
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          title: "序号",
          align: "center",
          dataIndex: "index",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          align: "center"
        },
        {
          title: "控制级别",
          dataIndex: "level",
          align: "center"
        },
        {
          title: "行业类型",
          dataIndex: "industryName",
          align: "center"
        },
        {
          title: "监控点名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "监测因子数",
          dataIndex: "divisorNum",
          align: "center"
        },
        {
          title: "是否在线",
          dataIndex: "onlineState",
          align: "center"
        },
        {
          title: "是否异常",
          dataIndex: "isNormal",
          align: "center"
        },
        {
          title: "最后通讯时间",
          dataIndex: "communicationTime",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      formInline: {
        enterpriseName: "",
        pointName: "",
        level: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getTableData() {
      let data = {
        enterpriseName: this.formInline.enterpriseName,
        pointName: this.formInline.pointName,
        index: this.current,
        pageSize: this.pageSize,
        level: this.formInline.level
      };
      this.loading = true;
      this.$api.monitor
        .getStandingData(data)
        .then(res => {
          if (res.data.state == 0) {
            this.tableData = res.data.data.records;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onLevelChange(value) {
      this.formInline.level = value;
    },
    toMonitorData(row) {
      this.$router.push({
        name: "monitor-standing-data",
        params: {
          row
        }
      });
    }
  }
};
</script>
