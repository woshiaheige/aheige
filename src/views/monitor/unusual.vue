<template>
  <div>
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
            @change="onLevelChange"
          >
            <a-select-option value="32">废水</a-select-option>
            <a-select-option value="31">废气</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getTableData">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" title="异常数据">
      <a-table
        bordered
        :loading="loading"
        rowKey="pointId"
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
      loading: false,
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          title: "序号",
          align: "center",
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
    getTableData() {
      let data = {
        enterpriseName: this.formInline.enterpriseName,
        pointName: this.formInline.pointName,
        index: this.current,
        pageSize: this.pageSize,
        industryId: ""
      };
      this.loading = true;
      this.$api.monitor
        .getStandingData(data)
        .then(res => {
          console.log(res);
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
      this.form.level = value;
    },
    toMonitorData(row) {
      console.log(row);
      this.$router.push("/monitor/data");
    }
  }
};
</script>
