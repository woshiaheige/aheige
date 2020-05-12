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
          <a-list
            itemLayout="horizontal"
            :loading="pointLoading"
            :dataSource="pointList"
          >
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :class="item.id == activeId ? 'active-list' : ''"
            >
              <a-list-item-meta
                :description="item.enterpriseName + '  |  ' + item.name"
                @click="goMarker(item.longitude, item.latitude, item.id)"
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
          <a-date-picker @change="onChange" class="select-time" />
          <a-list itemLayout="horizontal" :dataSource="carList">
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :class="item.id == activeId ? 'active-list' : ''"
            >
              <a-list-item-meta
                :description="item.number"
                @click="goMarker(item.lng, item.lat, item.id)"
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
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :class="item.id == activeId ? 'active-list' : ''"
            >
              <a-list-item-meta
                :description="item.groupName + '  |  ' + item.username"
                @click="goMarker(item.lng, item.lat, item.id)"
              >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </a-card>
    <!-- <map-info v-model="modelInfo" /> -->
  </div>
</template>

<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
import $ from "jquery";
// import mapInfo from "@/components/index/map-info";
export default {
  // components: { mapInfo },
  data() {
    return {
      activeId: "",
      map: null,
      markers: [],
      active: 1,
      pointList: [],
      carList: [],
      userList: [],
      value: "a",
      radioNum: "",
      deadline: Date.now() + 1000 * 60,
      pointLoading: false,
      showModelId: "",
      lineArr: ""
      // modelInfo: { show: false }
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
      this.callback(1, "");
    },
    //切换tabs
    async callback(key, value) {
      this.active = key;
      this.map.remove(this.markers);
      this.markers = [];
      if (key == 1) {
        await this.getPointData(value);
      } else if (key == 2) {
        await this.getCarData(value);
      } else if (key == 3) {
        await this.getUserData();
      }

      this.map.add(this.markers);
      this.map.setFitView();
    },
    //获取监测点地标
    async getPointData(num) {
      $(".amap-info").remove();
      this.pointLoading = true;
      let that = this;
      await this.$api.index.getWarnData({ type: num }).then(res => {
        if (res.data.state == 0) {
          this.pointLoading = false;
          this.pointList = [];
          let result = res.data.data;
          for (var i in result) {
            let marker;
            let green = '<div class="marker-info marker-green"></div>';
            let red = '<div class="marker-info marker-red"></div>';
            marker = new AMap.Marker({
              position: new AMap.LngLat(
                result[i].longitude,
                result[i].latitude
              ),
              title: result[i].enterpriseName + "  |  " + result[i].name,
              content: result[i].errorType == "4" ? green : red,
              id: result[i].id,
              anchor: "center"
            });
            if (result[i].errorType != "4") {
              marker.on("click", e => {
                that.showModelId = e.target.w.id;
                this.showInfo(marker, e);
              });
            }
            this.pointList.push(result[i]);
            this.markers.push(marker);
          }
        }
      });
    },
    //获取运维车辆地标
    async getCarData(value) {
      this.carList = [];
      await this.$api.index.getCarData({ dateTime: value }).then(res => {
        if (res.data.state == 0) {
          let result = res.data.data;
          for (var i in result) {
            let marker;
            let content =
              '<div class="marker-info marker-car"><a-icon class="car" />' +
              result[i].number +
              "</div>";
            marker = new AMap.Marker({
              position: new AMap.LngLat(result[i].lng, result[i].lat),
              // title: result[i].number,
              content: content,
              anchor: "center"
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
            let content =
              '<div class="marker-info marker-man"><a-icon class="man" />' +
              result[i].groupName +
              "  |  " +
              result[i].username +
              "</div>";
            marker = new AMap.Marker({
              position: new AMap.LngLat(result[i].lng, result[i].lat),
              title: result[i].groupName + "  |  " + result[i].username,
              content: content,
              anchor: "center"
            });
            this.userList.push(result[i]);
            this.markers.push(marker);
          }
        }
      });
    },
    async goMarker(lng, lat, id) {
      if (this.active == 1) {
        await this.callback(this.active, this.radioNum);
        this.map.remove(this.markers);
        // var cache = [];
        // let cloneMarkers = JSON.parse(
        //   JSON.stringify(this.markers, function(key, value) {
        //     if (typeof value === "object" && value !== null) {
        //       if (cache.indexOf(value) !== -1) {
        //         return;
        //       }
        //       cache.push(value);
        //     }
        //     return value;
        //   })
        // );
        this.markers.forEach(item => {
          if (item.w.id == id) {
            item.setAnimation("AMAP_ANIMATION_BOUNCE");
          }
        });
        this.map.add(this.markers);
      } else if (this.active == 2) {
        let params = {
          vehicleId: id
        };
        await this.$api.car.trajectory(params).then(res => {
          if (!(JSON.stringify(res.data.data) == "{}")) {
            this.lineArr = res.data.data.arr;
            // this.setCar();
            // this.setPolyLine();
            // this.map.setFitView();
          }
        });
      }
      this.map.setCenter([lng, lat]); //设置地图中心点
      this.activeId = id;
    },
    changStatus(e) {
      //1： 离线，2：超标 3：异常
      this.value = e.target.value;
      this.radioNum =
        this.value == "b"
          ? 1
          : this.value == "c"
          ? 2
          : this.value == "d"
          ? 3
          : "";
      this.callback(this.active, this.radioNum);
    },
    onChange(_, dateString) {
      this.callback(this.active, dateString);
    },
    onFinish() {
      this.deadline = Date.now() + 1000 * 60;
      this.callback(this.active, this.radioNum);
    },
    //设置车辆起点
    setCar() {
      this.markers = new AMap.Marker({
        map: this.map,
        position: this.lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });
    },
    // 绘制轨迹
    setPolyLine() {
      this.polyline = new AMap.Polyline({
        map: this.map,
        path: this.lineArr,
        showDir: true,
        strokeColor: "blue", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
    },
    //自定义窗体
    async showInfo(marker, e) {
      let data = {};
      let id = e.target.w.id;
      await this.$api.index.getPointData({ id }).then(res => {
        if (res.data.state == 0) {
          data = res.data.data;
        }
      });
      let that = this;
      let normalName = data.isNormal == 0 ? "正常" : "异常";
      let linelName = data.state == 0 ? "在线" : "离线";
      let bodyHtml = [
        '<div class="content-window ant-row">',
        '<div class="ant-col-12"><span>监控点名称：</span>' +
          data.name +
          "</div>",
        "<div class='ant-col-12'><span>所属企业：</span>" +
          data.enterpriseName +
          "</div>",
        "<div  class='ant-col-12'><span>MN号码：</span>" + data.mn + "</div>",
        "<div  class='ant-col-12'><span>监测因子数：</span>" +
          data.divisorCount +
          "</div>",
        "<div  class='ant-col-12'><span>是否在线：</span>" +
          linelName +
          "</div>",
        "<div  class='ant-col-12'><span>是否异常：</span>" +
          normalName +
          "</div>",
        "<div class='ant-col-24'><span>最后通迅时间：</span>" +
          data.communicationTime +
          "</div>"
      ];
      if (!(JSON.stringify(data.realData) == "{}")) {
        let res = data.realData;
        let html = [
          "<div class='ant-col-24'><span>监控数据：</span>" +
            res.dataTime +
            "</div>"
        ];
        res.list.forEach(item => {
          html.push(
            "<div class='ant-col-12'><span>" +
              item.codeName +
              "：</span>" +
              item.Avg +
              item.unit +
              "</div>"
          );
        });
        bodyHtml = bodyHtml.concat(html);
      }
      AMapUI.loadUI(["overlay/SimpleInfoWindow"], function(SimpleInfoWindow) {
        var infoWindow = new SimpleInfoWindow({
          infoTitle: data.name,
          infoBody: bodyHtml.join(""),
          // 基点指向marker的头部位置（信息窗体的具体位置）
          offset: new AMap.Pixel(-20, -40)
        });
        infoWindow.open(that.map, e.target.getPosition());
      });
    }
  }
};
</script>
