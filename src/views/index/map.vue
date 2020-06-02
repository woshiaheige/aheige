<template>
  <div class="map">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="站点位" key="1"></a-tab-pane>
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
        <div class="alarm-list point" v-if="active == 1">
          <div class="header">
            <div class="title">预警站点</div>
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
                @click="goPointMarker(item.longitude, item.latitude, item.id)"
              >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div class="alarm-list car" v-if="active == 2">
          <div class="header">
            <div class="title">运维车辆</div>
            <div class="value">{{ carList.length }}</div>
          </div>
          <a-date-picker
            @change="onChange"
            class="select-time"
            v-model="dateTime"
          />
          <a-list itemLayout="horizontal" :dataSource="carList">
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :class="item.id == activeId ? 'active-list' : ''"
            >
              <a-list-item-meta
                :description="item.number"
                v-if="item.latitude == null || item.longitude == null"
              />
              <a-list-item-meta
                v-else
                :description="item.number"
                @click="
                  goMarker(item.longitude, item.latitude, item.id, item.number)
                "
              >
              </a-list-item-meta>
              <a-tag
                color="red"
                v-if="item.latitude == null || item.longitude == null"
              >
                未激活
              </a-tag>
            </a-list-item>
          </a-list>
        </div>
        <div class="alarm-list user" v-if="active == 3">
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
                :description="item.groupName + '  |  ' + item.name"
                v-if="item.latitude == null || item.longitude == null"
              />
              <a-list-item-meta
                v-else
                :description="item.groupName + '  |  ' + item.name"
                @click="goMarker(item.longitude, item.latitude, item.id)"
              >
              </a-list-item-meta>
              <a-tag
                color="red"
                v-if="item.latitude == null || item.longitude == null"
              >
                未定位
              </a-tag>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </a-card>
    <map-info v-model="modelInfo" />
  </div>
</template>

<script>
import AMap from "AMap";
// import AMapUI from "AMapUI";
import $ from "jquery";
import mapInfo from "@/components/index/map-info";
export default {
  components: { mapInfo },
  data() {
    return {
      activeId: "",
      map: null,
      markers: [],
      polyline: [],
      active: 1,
      pointList: [],
      carList: [],
      userList: [],
      value: "a",
      radioNum: "",
      deadline: Date.now() + 1000 * 60,
      pointLoading: false,
      showModelId: "",
      lineArr: "",
      dateTime: null,
      modelInfo: { show: false }
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
        zoom: 10,
        mapStyle: "amap://styles/87458463341edbb88bf74018802e9e18"
      });
      this.callback(1, "");
    },
    //切换tabs
    async callback(key, value) {
      this.active = key;
      this.map.remove(this.polyline);
      this.map.remove(this.markers);
      this.markers = [];
      if (key == 1) {
        await this.getPointData(value);
      } else if (key == 2) {
        if (!value) this.dateTime = null;
        await this.getCarData(value);
      } else if (key == 3) {
        await this.getUserData();
      }

      this.map.add(this.markers);
      this.map.setFitView();
    },
    //获取站点地标
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
            marker.on("click", e => {
              that.showModelId = e.target.w.id;
              this.showInfo(marker, e.target.w.id, e.pixel);
            });
            if (result[i].errorType != "4") {
              this.pointList.push(result[i]);
            }
            this.markers.push(marker);
          }
        }
      });
    },
    //获取运维车辆地标
    async getCarData(value) {
      this.carList = [];
      this.markers = [];
      await this.$api.index.getCarData({ dateTime: value }).then(res => {
        if (res.data.state == 0 && res.data.data.length > 0) {
          let result = res.data.data;
          result.forEach(item => {
            this.carList.push(item);
            if (item.latitude != null && item.longitude != null) {
              let marker;
              let content =
                '<div class="marker-info marker-car"><a-icon class="car" />' +
                item.number +
                "</div>";
              marker = new AMap.Marker({
                position: new AMap.LngLat(item.longitude, item.latitude),
                // title: result[i].number,
                content: content,
                anchor: "center"
              });
              this.markers.push(marker);
            }
          });
        }
      });
    },
    //获取运维人员地标
    async getUserData() {
      this.userList = [];
      await this.$api.index.getUserData().then(res => {
        if (res.data.state == 0 && res.data.data.length > 0) {
          let result = res.data.data;
          result.forEach(item => {
            this.userList.push(item);
            if (item.latitude != null && item.longitude != null) {
              let marker;
              let content =
                '<div class="marker-info marker-man"><a-icon class="man" />' +
                item.groupName +
                "  |  " +
                item.username +
                "</div>";
              marker = new AMap.Marker({
                position: new AMap.LngLat(item.longitude, item.latitude),
                title: item.groupName + "  |  " + item.username,
                content: content,
                anchor: "center"
              });
              this.markers.push(marker);
            }
          });
        }
      });
    },
    //站点点击
    async goPointMarker(lng, lat, id) {
      await this.callback(this.active, this.radioNum);
      this.map.remove(this.markers);
      this.map.setCenter([lng, lat]); //设置地图中心点

      this.markers.forEach(item => {
        if (item.w.id == id) {
          item.setAnimation("AMAP_ANIMATION_BOUNCE");

          let pixel = {
            x: (window.innerWidth - 340) / 2,
            y: (window.innerHeight - 320) / 2
          };
          this.showInfo(item, id, pixel);
        }
      });
      this.map.add(this.markers);
      this.activeId = id;
    },
    goMarker(lng, lat, id, number) {
      if (this.active == 2) {
        this.map.remove(this.polyline);
        let params = {
          vehicleId: id,
          dateTime: this.$moment(this.dateTime).format("YYYY-MM-DD")
        };
        if (this.dateTime == "undefined" || this.dateTime == null) {
          params.dateTime = "";
        }
        this.$api.car.trajectory(params).then(res => {
          if (!(JSON.stringify(res.data.data) == "{}")) {
            this.lineArr = res.data.data.arr;
            this.map.remove(this.markers);
            this.markers = [];
            if (this.lineArr.length) {
              this.setCar();
              this.setPolyLine();
            } else {
              let marker;
              let content =
                '<div class="marker-info marker-car"><a-icon class="car" />' +
                number +
                "</div>";
              marker = new AMap.Marker({
                position: new AMap.LngLat(lng, lat),
                content: content,
                anchor: "center"
              });
              this.markers.push(marker);
              this.map.add(this.markers);
            }
            this.map.setFitView();
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
    onChange(moment, dateString) {
      this.map.remove(this.polyline);
      this.map.remove(this.markers);
      this.dateTime = moment;
      this.callback(this.active, dateString);
    },
    onFinish() {
      this.modelInfo.show = false;
      this.deadline = Date.now() + 1000 * 60;
      let value = "";
      if (this.active == 1) value = this.radioNum;
      this.map.remove(this.polyline);
      if (this.active == 2 && this.dateTime) {
        value = this.$moment(this.dateTime).format("YYYY-MM-DD");
      }
      this.callback(this.active, value);
    },
    //设置车辆起点
    setCar() {
      // let content =
      //   '<div class="marker-info marker-car"><a-icon class="car" /></div>';
      this.markers[0] = new AMap.Marker({
        map: this.map,
        position: this.lineArr[0],
        // content: content,
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png"
        // offset: new AMap.Pixel(-13, -13)
      });
      this.markers[1] = new AMap.Marker({
        map: this.map,
        position: this.lineArr[this.lineArr.length - 1],
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png"
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
    async showInfo(marker, id, pixel) {
      console.log(pixel);
      let data = {};
      await this.$api.index.getPointData({ id }).then(res => {
        if (res.data.state == 0) {
          data = res.data.data;
        }
      });
      this.modelInfo = {
        show: true,
        position: pixel,
        data: data
      };
      // let that = this;
      // let normalName = data.isNormal == 0 ? "正常" : "异常";
      // let linelName = data.state == 0 ? "在线" : "离线";
      // let bodyHtml = [
      //   '<div class="content-window ant-row">',
      //   '<div class="ant-col-12"><span>站点名称：</span>' +
      //     data.name +
      //     "</div>",
      //   "<div class='ant-col-12'><span>所属企业：</span>" +
      //     data.enterpriseName +
      //     "</div>",
      //   "<div  class='ant-col-12'><span>MN号：</span>" + data.mn + "</div>",
      //   "<div  class='ant-col-12'><span>监测因子数：</span>" +
      //     data.divisorCount +
      //     "</div>",
      //   "<div  class='ant-col-12'><span>是否在线：</span>" +
      //     linelName +
      //     "</div>",
      //   "<div  class='ant-col-12'><span>是否异常：</span>" +
      //     normalName +
      //     "</div>",
      //   "<div class='ant-col-24'><span>最后通迅时间：</span>" +
      //     data.communicationTime +
      //     "</div>"
      // ];
      // if (!(JSON.stringify(data.realData) == "{}")) {
      //   let res = data.realData;
      //   let html = [
      //     "<div class='ant-col-24'><span>数据时间：</span>" +
      //       res.dataTime +
      //       "</div>"
      //   ];
      //   res.list.forEach(item => {
      //     html.push(
      //       "<div class='ant-col-12'><span>" +
      //         item.codeName +
      //         "：</span>" +
      //         item.Avg +
      //         item.unit +
      //         "</div>"
      //     );
      //   });
      //   bodyHtml = bodyHtml.concat(html);
      // }
      // AMapUI.loadUI(["overlay/SimpleInfoWindow"], function(SimpleInfoWindow) {
      //   var infoWindow = new SimpleInfoWindow({
      //     infoTitle: data.name,
      //     infoBody: bodyHtml.join(""),
      //     // 基点指向marker的头部位置（信息窗体的具体位置）
      //     offset: new AMap.Pixel(-20, -40)
      //   });
      //   infoWindow.open(that.map, e.target.getPosition());
      // });
    }
  }
};
</script>
