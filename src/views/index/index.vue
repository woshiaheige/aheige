<template>
  <div class="index">
    <a-row :gutter="16">
      <a-col :span="4">
        <a-card :bordered="false">
          <a-statistic title="服务客户" :value="112" suffix="家"></a-statistic>
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
        <a-card :bordered="false" title="今日任务情况">
          <a-row>
            <a-col :span="6">
              <a-statistic title="今日任务" :value="14"></a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic
                title="今日已完成"
                :value="4"
                :valueStyle="{ color: '#3f8600' }"
              ></a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic
                title="今日未完成"
                :value="10"
                :valueStyle="{ color: '#ff9900' }"
              ></a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic
                title="过期任务"
                :value="3"
                :valueStyle="{ color: '#cf1322' }"
              ></a-statistic>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" title="小组完成情况">
          <div class="progress">
            <div class="item" v-for="n in 5" :key="n">
              <vue-awesome-progress
                circle-color="#e5e9f2"
                :circle-width="4"
                :line-width="4"
                :duration="2"
                :start-deg="0"
                :percentage="87"
                easing="0,0,1,1"
                :font-size="24"
              />
              <p>运维{{ n + 1 }}组</p>
            </div>
          </div>
        </a-card>
        <a-card :bordered="false">
          <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="超标提醒" key="1">
              Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane tab="合同提醒" key="2" forceRender
              >Content of Tab Pane 2</a-tab-pane
            >
            <a-tab-pane tab="投诉提醒" key="3"
              >Content of Tab Pane 3</a-tab-pane
            >
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false" title="本周运维人员TOP10">
          <!-- <ve-pie :data="chartData" :colors="colors"></ve-pie> -->
          <a-list itemLayout="horizontal" :dataSource="list">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta description="完成79个站点维护工作">
                <a slot="title">{{ item.title }}</a>
                <a-avatar
                  slot="avatar"
                  :src="require('@/assets/img/avatar.png')"
                />
              </a-list-item-meta>
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
          { name: "准时完成", value: 30 },
          { name: "逾期完成", value: 2 }
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
