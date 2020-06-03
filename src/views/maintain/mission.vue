<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="6">
          <div class="header-info">
            <span>全部任务</span>
            <p>{{ countData.all }}</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>待处理</span>
            <p>{{ countData.wait }}</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>已完成</span>
            <p>{{ countData.fin }}</p>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="header-info">
            <span>已关闭</span>
            <p>{{ countData.unfin }}</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="maintain" v-margin:top="16">
      <div class="card-header">
        <!-- <a-radio-group v-model="listType">
          <a-radio-button :value="1">站点列表</a-radio-button>
          <a-radio-button :value="2">任务列表</a-radio-button>
        </a-radio-group> -->
        <a-tabs v-model="activeKey" style="width:100%">
          <a-tab-pane key="1" tab="站点列表">
            <template v-if="activeKey == '1'">
              <mission-station ref="missionStation" />
            </template>
          </a-tab-pane>
          <a-tab-pane key="2" tab="任务列表">
            <template v-if="activeKey == '2'">
              <mission-detail />
            </template>
          </a-tab-pane>
          <a-button type="primary" slot="tabBarExtraContent" @click="newTask">
            <a-icon type="plus" />突发任务
          </a-button>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>
<script>
import missionStation from "@/components/maintain/mission/mission-station";
import missionDetail from "@/components/maintain/mission/mission-detail";
export default {
  components: {
    missionStation,
    missionDetail
  },
  data() {
    return {
      activeKey: "1",
      countData: {
        all: 0,
        wait: 0,
        fin: 0,
        unfin: 0
      }
    };
  },
  methods: {
    newTask() {
      this.$refs.missionStation.$data.show = true;
    }
  }
};
</script>
