<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="运维小组">
          <a-input
            placeholder="请输入"
            v-model="list.group"
            @pressEnter="onSubmit"
          ></a-input>
        </a-form-item>
        <a-form-item label="运维人员">
          <a-input
            placeholder="请输入"
            v-model="list.name"
            @pressEnter="onSubmit"
          ></a-input>
        </a-form-item>
        <a-form-item label="考评时间">
          <a-radio-group v-model="list.range" @change="getTableData">
            <a-radio-button :value="1">
              第一季度
            </a-radio-button>
            <a-radio-button :value="2">
              第二季度
            </a-radio-button>
            <a-radio-button :value="3">
              第三季度
            </a-radio-button>
            <a-radio-button :value="4">
              第四季度
            </a-radio-button>
          </a-radio-group>
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
        bordered
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
        :scroll="{ x: 1300 }"
      >
        <a slot="check" slot-scope="row">
          <a @click="goDetail(row)">分析</a>
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
  name: "season-assessment",
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      columns: [
        {
          title: "运维小组",
          dataIndex: "groupName",
          key: "groupName",
          fixed: "left",
          width: 150
        },
        {
          title: "运维人员",
          dataIndex: "username",
          key: "username",
          fixed: "left",
          width: 150
        },
        {
          title: "气类运维",
          dataIndex: "gas",
          key: "gas",
          children: []
        },
        {
          title: "水类运维",
          dataIndex: "water",
          key: "water",
          children: []
        },
        {
          title: "合计",
          dataIndex: "total",
          key: "total",
          width: 120,
          align: "center"
        },
        {
          title: "操作",
          key: "check",
          fixed: "right",
          align: "center",
          width: 100,
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: [],
      list: {
        group: "",
        name: "",
        range: this.season
      },
      mode: ["month", "month"],
      chartData: []
    };
  },
  computed: {
    season() {
      return this.$moment().quarter();
    },
    seasonStart() {
      if (this.list.range == 1) {
        return this.$moment()
          .month(0)
          .format("YYYY-MM");
      } else if (this.list.range == 2) {
        return this.$moment()
          .month(3)
          .format("YYYY-MM");
      } else if (this.list.range == 3) {
        return this.$moment()
          .month(6)
          .format("YYYY-MM");
      } else {
        return this.$moment()
          .month(9)
          .format("YYYY-MM");
      }
    },
    seasonEnd() {
      if (this.list.range == 1) {
        return this.$moment()
          .month(2)
          .format("YYYY-MM");
      } else if (this.list.range == 2) {
        return this.$moment()
          .month(5)
          .format("YYYY-MM");
      } else if (this.list.range == 3) {
        return this.$moment()
          .month(8)
          .format("YYYY-MM");
      } else {
        return this.$moment()
          .month(11)
          .format("YYYY-MM");
      }
    }
  },
  mounted() {
    this.list.range = this.season;
    this.getTableData();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "season-assessment-detail") {
      let arr = [];
      arr.push("season-assessment");
      this.$store.dispatch("createIncludeArr", arr);
    } else {
      this.$store.dispatch("createIncludeArr", []);
    }
    next();
  },
  methods: {
    reset() {
      this.list = {
        group: "",
        name: "",
        range: this.season
      };
    },
    async getTableData() {
      let data = {
        groupName: this.list.group,
        startMonth: this.seasonStart,
        endMonth: this.seasonEnd,
        name: this.list.name,
        page: this.current,
        size: this.pageSize
      };
      this.loading = true;
      await this.$api.assessment
        .getSeasonAssessment(data)
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
      this.columns[3].children = [];

      let data = {
        groupName: this.list.group,
        startMonth: this.seasonStart,
        endMonth: this.seasonEnd,
        name: this.list.name
      };

      await this.$api.assessment.getSeasonTitle(data).then(res => {
        if (res.data.state == 0) {
          res.data.data.forEach(item => {
            if (item.title == "运维操作") {
              item.childs.forEach(children => {
                if (children.title !== "合计") {
                  if (children.type === 31) {
                    this.columns[2].children.push({
                      title: children.title,
                      dataIndex: children.id,
                      key: children.id,
                      width: 120,
                      align: "center"
                    });
                  } else if (children.type === 32) {
                    this.columns[3].children.push({
                      title: children.title,
                      dataIndex: children.id,
                      key: children.id,
                      width: 120,
                      align: "center"
                    });
                  }
                }
              });
            }
          });
        }
      });
    },
    goDetail(row) {
      this.chartData = [];

      this.columns[2].children.forEach(item => {
        for (let key in row) {
          if (item.key == key) {
            this.chartData.push({
              value: row[key],
              name: item.title + "(气类)"
            });
          }
        }
      });

      this.columns[3].children.forEach(item => {
        for (let key in row) {
          if (item.key == key) {
            this.chartData.push({
              value: row[key],
              name: item.title + "(水类)"
            });
          }
        }
      });
      this.$router.push({
        path: "/assessment/season-assessment/detail",
        query: {
          memberId: row.id,
          beginTime: this.seasonStart,
          endTime: this.seasonEnd,
          type: 2,
          chartData: JSON.stringify(this.chartData)
        }
      });
    }
  }
};
</script>
