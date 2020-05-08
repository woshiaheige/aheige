<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="运维小组">
          <a-input
            placeholder="请输入"
            v-model="list.group"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="运维人员">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            @pressEnter="getTableData"
          ></a-input>
        </a-form-item>
        <a-form-item label="考评时间">
          <a-date-picker
            format="YYYY"
            :mode="mode"
            v-model="list.year"
            @panelChange="handlePanelChange"
          />
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="enterprise" v-margin:top="16">
      <div class="card-header">
        <div class="title">考评列表</div>
      </div>
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
        <a slot="check" slot-scope="row">
          <a @click="goDetail(row)">详情</a>
        </a>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :current="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      mode: "year",
      columns: [
        {
          title: "运维小组",
          dataIndex: "groupName",
          key: "groupName"
        },
        {
          title: "运维人员",
          dataIndex: "username",
          key: "username"
        },
        {
          title: "运维活动",
          dataIndex: "movement",
          key: "movement",
          children: []
        },
        {
          title: "操作",
          key: "check",
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: [],
      list: {
        group: "",
        name: "",
        year: this.$moment()
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    reset() {
      this.list = { group: "", name: "", year: this.$moment() };
    },
    handlePanelChange(value) {
      this.list.year = value;
      this.$forceUpdate();
    },
    async getTableData() {
      let data = {
        groupName: this.list.group,
        year:
          this.list.year == ""
            ? this.$moment().format("YYYY")
            : this.$moment(this.list.year).format("YYYY"),
        name: this.list.name,
        page: this.current,
        size: this.pageSize
      };
      this.loading = true;
      await this.$api.assessment
        .getYearlyAssessment(data)
        .then(async res => {
          if (res.data.state == 0) {
            this.loading = false;
            await this.getTitle();
            this.tableData = res.data.data.records;
            this.total = Number(res.data.data.total);
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    async getTitle() {
      this.columns[2].children = [];

      let data = {
        groupName: this.list.group,
        year:
          this.list.year == ""
            ? this.$moment().format("YYYY")
            : this.$moment(this.list.year).format("YYYY"),
        name: this.list.name
      };

      await this.$api.assessment.getYearlyTitle(data).then(res => {
        if (res.data.state == 0) {
          res.data.data.forEach(item => {
            if (item.title == "运维操作") {
              item.childs.forEach(children => {
                this.columns[2].children.push({
                  title: children.title,
                  dataIndex: children.title == "合计" ? "total" : children.id,
                  key: children.title == "合计" ? "total" : children.id
                });
              });
            }
          });
        }
      });
    },
    goDetail(row) {
      this.$router.push({
        path: "/assessment/yearly-assessment/detail",
        query: {
          memberId: row.id,
          beginTime: this.$moment(this.list.month).format("YYYY"),
          type: 1
        }
      });
    }
  }
};
</script>
