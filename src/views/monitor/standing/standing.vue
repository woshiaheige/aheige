<template>
  <div>
    <a-card :bordered="false">
      <a-form-model layout="inline">
        <a-form-model-item label="企业名称">
          <a-input
            v-model.trim="formInline.enterpriseName"
            placeholder="请输入"
          />
        </a-form-model-item>
        <a-form-model-item label="监控点名称">
          <a-input v-model="formInline.pointName" placeholder="请输入" />
        </a-form-model-item>
        <a-form-item label="控制级别">
          <a-select
            placeholder="请选择"
            allowClear
            v-width="150"
            v-model="formInline.level"
          >
            <a-select-option
              v-for="item in controlOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-model-item style="float: right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">监测数据</div>
      </div>
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
        :pageSize.sync="pagesize"
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
      controlOptions: [
        { name: "国控", value: 1 },
        { name: "省控", value: 2 },
        { name: "市控", value: 3 },
        { name: "县控", value: 4 }
      ],
      loading: false,
      pagesize: 10,
      current: 1,
      total: 0,
      tableData: [],
      columns: [
        {
          align: "center",
          title: "序号",
          width: 100,
          customRender: (_, __, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          }
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          align: "center"
        },
        {
          title: "控制级别",
          dataIndex: "level",
          align: "center",
          width: 100,
          customRender: text => {
            if (text == "1") {
              return "国控";
            } else if (text == "2") {
              return "省控";
            } else if (text == "3") {
              return "市控";
            } else if (text == "4") {
              return "县控";
            }
          }
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
          align: "center",
          width: 100,
          customRender: text => {
            if (text == 0) {
              return "在线";
            } else if (text == 1) {
              return "离线";
            }
          }
        },
        {
          title: "是否异常",
          dataIndex: "isNormal",
          align: "center",
          width: 100,
          customRender: text => {
            if (text == 0) {
              return "正常";
            } else if (text == 1) {
              return "异常";
            }
          }
        },
        {
          title: "最后通讯时间",
          dataIndex: "communicationTime",
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
        pointName: "",
        level: undefined
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
        pageSize: this.pagesize,
        level: this.formInline.level || ""
      };
      this.loading = true;
      this.$api.monitor
        .getStandingData(data)
        .then(res => {
          if (res.data.state == 0) {
            this.total = Number(res.data.data.total);
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
