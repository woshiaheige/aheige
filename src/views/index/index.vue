<template>
  <div class="index">
    <a-row :gutter="16">
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic
            title="运维企业"
            :value="countList.enterpriseCount"
            suffix="家"
          ></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic
            title="运维站点"
            :value="countList.pointCount"
            suffix="个"
          ></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic
            title="运维小组"
            :value="countList.groupCount"
            suffix="组"
          ></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic
            title="运维人员"
            :value="countList.userCount"
            suffix="人"
          ></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic
            title="运维车辆"
            :value="countList.vehicleCount"
            suffix="辆"
          ></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic
            title="供应商"
            :value="countList.supplierCount"
            suffix="家"
          ></a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card :bordered="false" title="今日小组完成情况">
          <div class="progress">
            <div
              class="item"
              v-for="(item, index) in completionList"
              :key="index"
            >
              <a-progress
                type="circle"
                :percent="
                  item.count == 0
                    ? 100
                    : ((item.completeCount / item.count) * 100).toFixed(2)
                "
                :width="120"
              >
                <template v-slot:format="percent">
                  <p v-fontsize="16">{{ percent }}%</p>
                  <p>{{ item.groupName }}</p>
                </template>
              </a-progress>
            </div>
          </div>
          <a-empty v-if="!completionList.length" :image="simpleImage" />
        </a-card>
        <a-card :bordered="false">
          <a-tabs defaultActiveKey="1" @change="changeTabs">
            <a-tab-pane tab="站点报警提醒" key="1">
              <point-list ref="pointList"></point-list>
            </a-tab-pane>
            <a-tab-pane tab="合同到期提醒" key="2">
              <contract-list ref="contractList"></contract-list>
            </a-tab-pane>
            <a-tab-pane tab="客户投诉提醒" key="3">
              <customer-list ref="customerList"></customer-list>
            </a-tab-pane>
            <a-tab-pane tab="物资库存提醒" key="4">
              <goods-list ref="goodsList"></goods-list>
            </a-tab-pane>
            <a-tab-pane tab="车辆年检提醒" key="5">
              <car-list ref="carList"></car-list>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false" title="今日任务完成情况">
          <ve-ring :data="chartData"></ve-ring>
          <a-empty v-if="isEmpty" :image="simpleImage" />
        </a-card>
        <a-card :bordered="false" title="本周运维人员TOP10">
          <a-list itemLayout="horizontal" :dataSource="rankingList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.groupName">
                <a slot="title">{{ item.userName }}</a>
                <a-avatar
                  slot="avatar"
                  :src="require('@/assets/img/avatar.png')"
                />
              </a-list-item-meta>
              <a-statistic :value="item.size" />
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import pointList from "@/components/index/point-list.vue";
import contractList from "@/components/index/contract-list.vue";
import customerList from "@/components/index/customer-list.vue";
import goodsList from "@/components/index/goods-list.vue";
import carList from "@/components/index/car-list.vue";
export default {
  components: { pointList, contractList, customerList, goodsList, carList },
  data() {
    return {
      map: null,
      place: null,
      colors: ["#1890ff", "orange", "#cf1322"],
      chartData: {},
      chartData2: {
        columns: ["name", "value"],
        rows: [
          { name: "例行", value: 50 },
          { name: "突发", value: 8 }
        ]
      },
      rankingList: [],
      completionList: [],
      countList: {},
      isEmpty: true
    };
  },

  mounted() {
    this.getRankingData();
    this.getTaskData();
    this.getStatisticsData();
    this.getCompletionData();
  },
  methods: {
    //运维统计
    getStatisticsData() {
      this.$api.index.getStatistics().then(res => {
        if (res.data.state == 0) {
          this.countList = res.data.data;
        }
      });
    },
    //小组任务完成情况
    getCompletionData() {
      this.$api.index
        .completion({
          type: 1 //1 :今天 2 ：昨天
        })
        .then(res => {
          if (res.data.state == 0) {
            this.completionList = res.data.data;
          }
        });
    },
    //top10
    getRankingData() {
      this.$api.index.taskRanking().then(res => {
        if (res.data.state == 0) {
          this.rankingList = res.data.data;
        }
      });
    },
    //任务完成情况
    getTaskData() {
      this.$api.index.taskCount().then(res => {
        if (res.data.state == 0) {
          let result = res.data.data;
          this.chartData = {
            columns: ["name", "value"],
            rows: [
              { name: "已完成", value: result.completeCount },
              { name: "未完成", value: result.count - result.completeCount }
            ]
          };
          if (result) {
            this.isEmpty = false;
          }
        }
      });
    },
    //消息提醒列表
    changeTabs(key) {
      console.log(key);
      let that = this;
      switch (key) {
        case "1":
          if (that.$refs.pointList) {
            that.$refs.pointList.getTableData();
          }
          break;
        case "2":
          if (that.$refs.contractList) {
            that.$refs.contractList.getTableData();
          }
          break;
        case "3":
          if (that.$refs.customerList) {
            that.$refs.customerList.getTableData();
          }
          break;
        case "4":
          if (that.$refs.goodsList) {
            that.$refs.goodsList.getTableData();
          }
          break;
        case "5":
          if (that.$refs.carList) {
            that.$refs.carList.getTableData();
          }
          break;
      }
    }
  }
};
</script>
