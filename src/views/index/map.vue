<template>
  <div class="map">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="监控点位" key="1"></a-tab-pane>
        <a-tab-pane tab="运维车辆" key="2"></a-tab-pane>
        <div slot="tabBarExtraContent">
          <template class="extra">
            <a-statistic-countdown
              :value="Date.now() + 1000 * 60"
              format="s 秒后自动更新"
            />
          </template>
        </div>
      </a-tabs>
      <div class="map-container">
        <div id="map"></div>
        <div class="status-flag" v-if="active == 1">
          <a-tag color="#87d068">正常</a-tag>
          <a-tag color="#f50">报警</a-tag>
        </div>
        <div class="alarm-list" v-if="active == 1">
          <div class="header">
            <div class="title">预警监控点</div>
            <div class="value">26</div>
          </div>
          <a-radio-group
            defaultValue="a"
            buttonStyle="solid"
            class="check-type"
          >
            <a-radio-button value="a">全部</a-radio-button>
            <a-radio-button value="b">断线</a-radio-button>
            <a-radio-button value="c">超标</a-radio-button>
            <a-radio-button value="d">异常</a-radio-button>
          </a-radio-group>
          <a-list>
            <a-list-item slot="renderItem">
              XX企业监控点
            </a-list-item>
          </a-list>
        </div>
        <div class="alarm-list" v-if="active == 2">
          <div class="header">
            <div class="title">运维车辆</div>
            <div class="value">5</div>
          </div>
          <a-date-picker @change="onChange" class="select-time" />
          <a-list>
            <a-list-item slot="renderItem"> 粤A45221 </a-list-item>
          </a-list>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      map: null,
      markers: [],
      active: 1
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("map", {
        center: [114.412599, 23.079404],
        resizeEnable: true,
        zoom: 12,
        mapStyle: "amap://styles/87458463341edbb88bf74018802e9e18"
      });
    },
    callback(key) {
      this.active = key;
    }
  }
};
</script>
