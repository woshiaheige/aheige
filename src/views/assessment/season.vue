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
          <a-range-picker
            format="YYYY-MM"
            :mode="mode"
            v-model="list.range"
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
      columns: [
        {
          title: "运维小组",
          dataIndex: "groupName",
          key: "groupName",
          fixed: "left",
          width: 120
        },
        {
          title: "运维人员",
          dataIndex: "username",
          key: "username",
          fixed: "left",
          width: 120
        },
        {
          title: "运维活动",
          dataIndex: "movement",
          key: "movement",
          children: [
            {
              title: "气类",
              dataIndex: "gas",
              key: "gas",
              children: []
            },
            {
              title: "水类",
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
            }
          ]
        },
        {
          title: "操作",
          key: "check",
          fixed: "right",
          align: "center",
          width: 80,
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
      if (this.$moment().month() <= 2) {
        return [this.$moment().month(0), this.$moment().month(2)];
      } else if (this.$moment().month() > 2 && this.$moment().month() <= 5) {
        return [this.$moment().month(3), this.$moment().month(5)];
      } else if (this.$moment().month() > 5 && this.$moment().month() <= 8) {
        return [this.$moment().month(6), this.$moment().month(8)];
      } else {
        return [this.$moment().month(9), this.$moment().month(11)];
      }
    }
  },
  mounted() {
    this.list.range = this.season;
    this.getTableData();
  },
  methods: {
    reset() {
      this.list = {
        group: "",
        name: "",
        range: this.season
      };
    },
    handlePanelChange(value, mode) {
      value[1] = this.$moment(value[0]).add(2, "M");
      this.list.range = value;
      this.mode = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
    },
    async getTableData() {
      let data = {
        groupName: this.list.group,
        startMonth:
          this.list.range[0] == ""
            ? this.$moment()
                .subtract(2, "M")
                .format("YYYY-MM")
            : this.$moment(this.list.range[0]).format("YYYY-MM"),
        endMonth:
          this.list.range[1] == ""
            ? this.$moment().format("YYYY-MM")
            : this.$moment(this.list.range[1]).format("YYYY-MM"),
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
      this.columns[2].children[0].children = [];
      this.columns[2].children[1].children = [];

      let data = {
        groupName: this.list.group,
        startMonth:
          this.list.range[0] == ""
            ? this.$moment()
                .subtract(2, "M")
                .format("YYYY-MM")
            : this.$moment(this.list.range[0]).format("YYYY-MM"),
        endMonth:
          this.list.range[1] == ""
            ? this.$moment().format("YYYY-MM")
            : this.$moment(this.list.range[1]).format("YYYY-MM"),
        name: this.list.name
      };

      await this.$api.assessment.getSeasonTitle(data).then(res => {
        if (res.data.state == 0) {
          res.data.data.forEach(item => {
            if (item.title == "运维操作") {
              item.childs.forEach(children => {
                if (children.title !== "合计") {
                  if (children.type === 31) {
                    this.columns[2].children[0].children.push({
                      title: children.title,
                      dataIndex: children.id,
                      key: children.id,
                      width: 120,
                      align: "center"
                    });
                  } else if (children.type === 32) {
                    this.columns[2].children[1].children.push({
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
      this.columns[2].children[0].children.forEach(item => {
        for (let key in row) {
          if (item.key == key) {
            this.chartData.push({ value: row[key], name: item.title });
          }
        }
      });

      this.columns[2].children[1].children.forEach(item => {
        for (let key in row) {
          if (item.key == key) {
            this.chartData.push({ value: row[key], name: item.title });
          }
        }
      });
      this.$router.push({
        path: "/assessment/season-assessment/detail",
        query: {
          memberId: row.id,
          beginTime: this.$moment(this.list.range[0]).format("YYYY-MM"),
          endTime: this.$moment(this.list.range[1]).format("YYYY-MM"),
          type: 2,
          chartData: JSON.stringify(this.chartData)
        }
      });
    }
  }
};
</script>
