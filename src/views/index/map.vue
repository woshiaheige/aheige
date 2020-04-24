<template>
  <div class="map">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="监控点位" key="1"></a-tab-pane>
        <a-tab-pane tab="运维车辆" key="2"></a-tab-pane>
        <a-tab-pane tab="运维人员" key="3"></a-tab-pane>
        <div slot="tabBarExtraContent">
          <template class="extra">
            <a-statistic-countdown
              :value="deadline"
              @finish="onFinish"
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
            <div class="value">{{ pointList.length }}</div>
          </div>
          <a-radio-group
            defaultValue="a"
            buttonStyle="solid"
            class="check-type"
            @change="changStatus"
            v-model="value"
          >
            <a-radio-button value="a">全部</a-radio-button>
            <a-radio-button value="b">断线</a-radio-button>
            <a-radio-button value="c">超标</a-radio-button>
            <a-radio-button value="d">异常</a-radio-button>
          </a-radio-group>
          <a-list itemLayout="horizontal" :dataSource="pointList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item.name"
                @click="goMarker(item.longitude, item.latitude)"
              >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div class="alarm-list" v-if="active == 2">
          <div class="header">
            <div class="title">运维车辆</div>
            <div class="value">{{ carList.length }}</div>
          </div>
          <!-- <a-date-picker @change="onChange" class="select-time" /> -->
          <a-list itemLayout="horizontal" :dataSource="carList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item.number"
                @click="goMarker(item.lng, item.lat)"
              >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div class="alarm-list" v-if="active == 3">
          <div class="header">
            <div class="title">运维人员</div>
            <div class="value">{{ userList.length }}</div>
          </div>
          <!-- <a-date-picker @change="onChange" class="select-time" /> -->
          <a-list itemLayout="horizontal" :dataSource="userList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item.username"
                @click="goMarker(item.lng, item.lat)"
              >
              </a-list-item-meta>
            </a-list-item>
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
      active: 1,
      pointList: [],
      carList: [],
      userList: [],
      value: "a",
      deadline: Date.now() + 1000 * 60
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
      this.callback(1);
    },
    //切换tabs
    async callback(key, value) {
      this.active = key;
      this.map.remove(this.markers);
      this.markers = [];
      if (key == 1) {
        await this.getPointData(value);
      } else if (key == 2) {
        await this.getCarData();
      } else if (key == 3) {
        await this.getUserData();
      }
      console.log(this.markers);
      this.map.add(this.markers);
      this.map.setFitView();
    },
    //获取监测点地标
    async getPointData(num) {
      this.pointList = [];
      await this.$api.index.getWarnData({ type: num }).then(res => {
        if (res.data.state == 0) {
          let result = res.data.data;
          for (var i in result) {
            let marker;
            marker = new AMap.Marker({
              position: new AMap.LngLat(
                result[i].longitude,
                result[i].latitude
              ),
              title: result[i].name
            });
            this.pointList.push(result[i]);
            this.markers.push(marker);
          }
        }
      });
    },
    //获取运维车辆地标
    async getCarData() {
      this.carList = [];
      await this.$api.index.getCarData().then(res => {
        if (res.data.state == 0) {
          let result = res.data.data;
          for (var i in result) {
            let marker;
            marker = new AMap.Marker({
              position: new AMap.LngLat(result[i].lng, result[i].lat),
              title: result[i].number
            });
            this.carList.push(result[i]);
            this.markers.push(marker);
          }
        }
      });
    },
    //获取运维人员地标
    async getUserData() {
      this.userList = [];
      await this.$api.index.getUserData().then(res => {
        if (res.data.state == 0) {
          let result = res.data.data;
          for (var i in result) {
            let marker;
            marker = new AMap.Marker({
              position: new AMap.LngLat(result[i].lng, result[i].lat),
              title: result[i].username
            });
            this.userList.push(result[i]);
            this.markers.push(marker);
          }
        }
      });
    },
    goMarker(lng, lat) {
      this.map.setCenter([lng, lat]); //设置地图中心点
    },
    changStatus(e) {
      console.log(e.target.value);
      //1： 离线，2：超标 3：异常
      this.value = e.target.value;
      let num =
        this.value == "b"
          ? 1
          : this.value == "c"
          ? 2
          : this.value == "d"
          ? 3
          : "";
      this.callback(this.active, num);
    },
    // onChange(_, dateString) {
    //   this.callback(this.active, dateString);
    // },
    onFinish() {
      console.log("finished!");
      this.deadline = Date.now() + 1000 * 60;
    }
  }
};
</script>
