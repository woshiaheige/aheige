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
                :percent="(item.completeCount / item.count) * 100"
                :width="120"
              >
                <template v-slot:format="percent">
                  <p v-fontsize="16">{{ percent }}%</p>
                  <p>{{ item.groupName }}</p>
                </template>
              </a-progress>
            </div>
          </div>
        </a-card>
        <a-card :bordered="false">
          <a-tabs defaultActiveKey="1" @change="changeTabs">
            <a-tab-pane tab="站点报警提醒" key="1">
              <a-list itemLayout="horizontal" :dataSource="warnList">
                <a-list-item slot="renderItem">
                  <a slot="actions">查看详情</a>
                  <a-list-item-meta
                    description="XXX监测点发生数据告警，请及时处理！"
                  >
                    <a slot="title">企业名称</a>
                    <a-avatar
                      slot="avatar"
                      :src="require('@/assets/img/alarm.png')"
                    />
                  </a-list-item-meta>
                  <div v-margin:right="48">
                    <p>报警类型</p>
                    <p>数据超标</p>
                  </div>
                  <div>
                    <p>报警时间</p>
                    <p>2020-04-21 11:45:21</p>
                  </div>
                </a-list-item>
              </a-list>
              <a-pagination
                size="small"
                :defaultCurrent="current"
                :total="total"
              />
            </a-tab-pane>
            <a-tab-pane tab="合同到期提醒" key="2">
              <a-list itemLayout="horizontal" :dataSource="list">
                <a-list-item slot="renderItem">
                  <a slot="actions">查看详情</a>
                  <a-list-item-meta
                    description="合同将于2020-04-31日到期，请及时续签！"
                  >
                    <a slot="title">企业名称</a>
                    <a-avatar
                      slot="avatar"
                      :src="require('@/assets/img/contract.png')"
                    />
                  </a-list-item-meta>
                  <div>
                    <p>剩余天数</p>
                    <p>4天</p>
                  </div>
                </a-list-item>
              </a-list>
              <a-pagination
                size="small"
                :defaultCurrent="current"
                :total="total"
              />
            </a-tab-pane>
            <a-tab-pane tab="客户投诉提醒" key="3">
              <a-list itemLayout="horizontal" :dataSource="list">
                <a-list-item slot="renderItem">
                  <a slot="actions">查看详情</a>
                  <a-list-item-meta
                    description="客户于2020-04-31 12:34:56发起投诉，请及时处理！"
                  >
                    <a slot="title">企业名称</a>
                    <a-avatar
                      slot="avatar"
                      :src="require('@/assets/img/complain.png')"
                    />
                  </a-list-item-meta>
                  <div>
                    <p>已持续</p>
                    <p>3天</p>
                  </div>
                </a-list-item>
              </a-list>
              <a-pagination
                size="small"
                :defaultCurrent="current"
                :total="total"
              />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false" title="今日任务完成情况">
          <ve-ring :data="chartData"></ve-ring>
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
export default {
  data() {
    return {
      current: 1,
      total: 0,
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
      list: [
        {
          title: "张三"
        },
        {
          title: "李四"
        },
        {
          title: "王二麻子"
        },
        {
          title: "刘武"
        },
        {
          title: "刘武"
        },
        {
          title: "刘武"
        },
        {
          title: "刘武"
        },
        {
          title: "刘武"
        },
        {
          title: "刘武"
        },
        {
          title: "刘武"
        }
      ],
      rankingList: [],
      completionList: [],
      countList: {},
      warnList: []
    };
  },
  mounted() {
    this.getRankingData();
    this.getTaskData();
    this.getStatisticsData();
    this.getCompletionData();
    this.getRemindsData(1);
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
        }
      });
    },
    //消息提醒列表
    getRemindsData(key) {
      let data = {
        index: this.current,
        size: 10,
        type: key //1： 站点预警提醒，2：合同提醒 3：客户投诉
      };
      this.$api.index.reminds(data).then(res => {
        if (res.data.state == 0) {
          this.warnList = res.data.data.records;
        }
      });
    },
    changeTabs(key) {
      this.current = 1;
      this.getRemindsData(key);
    }
  }
};
</script>
