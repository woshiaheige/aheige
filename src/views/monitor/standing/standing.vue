<template>
  <div>
    <a-card :bordered="false">
      <a-form-model layout="inline">
        <a-form-model-item label="企业名称">
          <a-input
            v-model.trim="formInline.enterpriseName"
            @pressEnter="getTableData"
            placeholder="请输入"
          />
        </a-form-model-item>
        <a-form-model-item label="监控点名称">
          <a-input
            v-model="formInline.pointName"
            placeholder="请输入"
            @pressEnter="getTableData"
          />
        </a-form-model-item>
        <a-form-item label="控制级别">
          <a-select
            placeholder="请选择"
            allowClear
            v-width="150"
            v-model="formInline.level"
            showSearch
            :filterOption="filterOptions"
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
        <div class="title">企业监测点</div>
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
        <template slot="level" slot-scope="level">
          <a-tag color="red" v-if="level == 1">国控</a-tag>
          <a-tag color="pink" v-if="level == 2">省控</a-tag>
          <a-tag color="purple" v-if="level == 3">市控</a-tag>
          <a-tag color="orange" v-if="level == 4">县控</a-tag>
        </template>
        <template slot="onlineState" slot-scope="onlineState">
          <a-badge status="success" text="在线" v-if="onlineState == 0" />
          <a-badge status="error" text="离线" v-if="onlineState == 1" />
        </template>
        <template slot="isNormal" slot-scope="isNormal">
          <a-badge status="success" text="正常" v-if="isNormal == 0" />
          <a-badge status="error" text="异常" v-if="isNormal == 1" />
        </template>
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">查看数据</a>
          <a-divider type="vertical" />
          <a @click="stationControl(row)">设备反控</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        :showTotal="total => `共 ${total} 条`"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pageSize"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
    </a-card>
    <station-control
      :visible="visible"
      :modalObj="controlObj"
      @cancel="onCancel"
    ></station-control>
  </div>
</template>

<script>
import stationControl from "@/components/monitor/station-control.vue";
export default {
  components: { stationControl },
  data() {
    return {
      controlObj: {},
      visible: false,
      controlOptions: [
        { name: "国控", value: 1 },
        { name: "省控", value: 2 },
        { name: "市控", value: 3 },
        { name: "县控", value: 4 }
      ],
      loading: false,
      pageSize: 10,
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
              <span>{index + (this.current - 1) * this.pageSize + 1}</span>
            );
          }
        },
        {
          title: "企业名称",
          dataIndex: "enterpriseName"
        },
        {
          title: "控制级别",
          dataIndex: "level",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "level" }
        },
        {
          title: "行业类型",
          dataIndex: "industryName",
          align: "center"
        },
        {
          title: "监控点名称",
          dataIndex: "name"
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
          scopedSlots: { customRender: "onlineState" }
        },
        {
          title: "是否异常",
          dataIndex: "isNormal",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "isNormal" }
        },
        {
          title: "最后通讯时间",
          dataIndex: "communicationTime",
          align: "center"
        },
        {
          title: "操作",
          width: 200,
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
    //关闭弹窗
    onCancel() {
      this.visible = false;
    },
    //设备反控
    stationControl(row) {
      console.log(row);
      this.visible = true;
      this.controlObj = row;
    },
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
        page: this.current,
        pageSize: this.pageSize,
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
        query: { id: row.pointId }
      });
    }
  }
};
</script>
