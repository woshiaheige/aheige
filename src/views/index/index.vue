<template>
  <div class="index">
    <a-row :gutter="16">
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="运维企业" :value="112" suffix="家"></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="运维站点" :value="136" suffix="个"></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="运维小组" :value="4" suffix="组"></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="运维人员" :value="14" suffix="人"></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="运维车辆" :value="3" suffix="辆"></a-statistic>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="供应商" :value="14" suffix="家"></a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="18">
        <a-card :bordered="false" title="今日小组完成情况">
          <div class="progress">
            <div class="item" v-for="n in 5" :key="n">
              <a-progress type="circle" :percent="30" :width="120">
                <template v-slot:format="percent">
                  <p v-fontsize="16">{{ percent }}%</p>
                  <p>运维1组</p>
                </template>
              </a-progress>
            </div>
          </div>
        </a-card>
        <a-card :bordered="false">
          <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="站点报警提醒" key="1">
              <a-list itemLayout="horizontal" :dataSource="list">
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
              <a-pagination size="small" :total="50" />
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
              <a-pagination size="small" :total="50" />
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
              <a-pagination size="small" :total="50" />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false" title="今日任务完成情况">
          <ve-ring :data="chartData"></ve-ring>
        </a-card>
        <a-card :bordered="false" title="本周运维人员TOP10">
          <!-- <ve-pie :data="chartData" :colors="colors"></ve-pie> -->
          <a-list itemLayout="horizontal" :dataSource="list">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta description="运维1组">
                <a slot="title">{{ item.title }}</a>
                <a-avatar
                  slot="avatar"
                  :src="require('@/assets/img/avatar.png')"
                />
              </a-list-item-meta>
              <a-statistic :value="76" />
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
      map: null,
      place: null,
      colors: ["#1890ff", "orange", "#cf1322"],
      chartData: {
        columns: ["name", "value"],
        rows: [
          { name: "已完成", value: 30 },
          { name: "未完成", value: 2 }
        ]
      },
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
      ]
    };
  },
  mounted() {},
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>
