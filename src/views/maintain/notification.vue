<template>
  <div>
    <a-card :bordered="false"
      ><a-form-model layout="inline">
        <a-form-model-item label="企业名称">
          <a-input v-model="formInline.enterpriseName" placeholder="请输入" />
        </a-form-model-item>
        <a-form-item label="报表类型">
          <a-select
            placeholder="请选择"
            allowClear
            v-width="150"
            v-model="formInline.reportType"
          >
            <a-select-option
              v-for="item in rportTypeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-model-item label="时间范围">
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item style="float:right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model></a-card
    >
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">报表推送</div>
      </div>
      <a-table
        size="middle"
        :loading="loading"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">查看</a>
        </span>
      </a-table>
      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pagesize"
        :showTotal="total => `共 ${total} 条`"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rportTypeList: [
        { name: "季报表", value: 1 },
        { name: "月报表", value: 2 },
        { name: "周报表", value: 3 }
      ],
      loading: false,
      pagesize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          title: "推送企业",
          dataIndex: "enterpriseName",
          key: "enterpriseName"
        },
        {
          title: "报表类型",
          dataIndex: "rportType",
          key: "rportType",
          width: 200,
          align: "center"
        },
        {
          title: "超标时间",
          dataIndex: "dateTime",
          key: "dateTime",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          width: 120,
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      formInline: {
        enterpriseName: "",
        beginTime: "",
        reportType: undefined,
        endTime: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pagesize,
        beginTime: this.formInline.beginTime,
        endTime: this.formInline.endTime,
        enterpriseName: this.formInline.enterpriseName,
        mn: this.formInline.mn,
        pointName: this.formInline.pointName
      };
      this.$api.monitor
        .getWarnData(data)
        .then(res => {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onChange(date, dateString) {
      this.formInline.beginTime = dateString[0] + " 00:00:00";
      this.formInline.endTime = dateString[1] + " 23:59:59";
    }
  }
};
</script>
