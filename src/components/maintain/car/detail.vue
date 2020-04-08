<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title"
      ><a-icon type="arrow-left" @click="$router.back(-1)" />行驶路径</span
    >
    <div class="map">
      <div class="map-info">
        搜索点数：<span id="mapView">{{
          markers.length + pointMarkers.length
        }}</span>
        显示站点数：<span id="massNumber">{{ pointMarkers.length }}</span>
      </div>
      <!--search start-->
      <div class="map-tabs">
        <a-tabs defaultActiveKey="2" tabPosition="left" @change="changeTabs">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="apple" />
              站点
            </span>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="apple" />
              车辆
            </span>
            <a-form v-show="collapsed">
              <p class="car-tabs-form-p">
                <a-icon type="car" v-margin:right="8" />展示车辆实时位置
              </p>
              <!-- <a-form-item style="border:1px solid #E4E4E4;">
                <a-icon type="car" v-margin:right="8" />展示车辆实时位置
              </a-form-item> -->
              <a-form-item v-margin:bottom="0">
                <b>车辆历史轨迹</b>
              </a-form-item>
              <a-form-item>
                <a-select placeholder="车辆">
                  <!-- <a-select-option :value=""></a-select-option> -->
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-date-picker
                  show-time
                  type="date"
                  placeholder="日期"
                  style="width: 100%;"
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" icon="monitor" @click="handleSubmit">
                  显示轨迹
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
        <a-button-group>
          <a-button type="link" v-if="collapsed" @click="changeVisible">
            <a-icon type="right" />
          </a-button>
          <a-button type="link" v-else @click="changeVisible">
            <a-icon type="left" />
          </a-button>
        </a-button-group>
      </div>
      <!--search over-->
      <div id="container"></div>
    </div>
  </a-card>
</template>
<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
import $ from "jquery";
import Point from "@/assets/geojson/enterprise.json";
import Station from "@/assets/geojson/station.json";
export default {
  components: {},
  data() {
    return {
      collapsed: true,
      map: null,
      markers: [],
      pointMarkers: [],
      colors: {},
      model: {
        title: "",
        status: ""
      }
    };
  },
  methods: {
    initData() {
      this.map = new AMap.Map("container", {
        center: [113.53, 23.36],
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 8,
        // zoomEnable: false, //地图是否可缩放
        doubleClickZoom: false // 地图是否可通过双击鼠标放大地图
      });

      this.chooseProvince();
    },
    //选择广东省
    chooseProvince() {
      this.map.setZoomAndCenter(8, [113.53, 23.36]);
      this.showPlacePoint();
      this.showStationPoint();
    },
    //显示站点
    showPlacePoint() {
      this.map.remove(this.markers);
      this.markers = [];
      Point.forEach(item => {
        let marker;
        // 创建一个 Marker 实例：
        marker = new AMap.Marker({
          position: new AMap.LngLat(item.point[0], item.point[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.name
        });
        marker.on("click", e => {
          this.model.title = e.target.w.title;
          this.model.status = e.target.status;
          this.showInfo(marker, e);
        });
        this.markers.push(marker);
      });

      this.map.add(this.markers);
    },
    //显示车辆
    showStationPoint() {
      this.map.remove(this.pointMarkers);
      this.pointMarkers = [];

      Station.forEach(item => {
        let marker;
        let content =
          '<div class="marker-label-car"><a-icon type="car" />' +
          item.carName +
          "</div>";
        // 创建一个 Marker 实例：
        marker = new AMap.Marker({
          position: new AMap.LngLat(item.point[0], item.point[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.name,
          content: content,
          anchor: "center"
        });

        this.pointMarkers.push(marker);
      });

      this.map.add(this.pointMarkers);
      this.map.setFitView();
    },
    //自定义窗体
    showInfo(marker, e) {
      let that = this;
      AMapUI.loadUI(["overlay/SimpleInfoWindow"], function(SimpleInfoWindow) {
        var infoWindow = new SimpleInfoWindow({
          infoTitle: e.target.w.title,
          infoBody: [
            '<div class="guideWrapper content-window">',
            '<div class="tabs"><ul id="tabs">',
            '<li class="tab-nav active">站点信息</li>',
            '<li class="tab-nav">任务信息</li>',
            '<li class="tab-nav">实时数据</li>',
            "</ul></div>",
            '<div id="tabs-body">',
            //第一个tabs
            '<div style="display:block"><li>1.站点信息 2020-3-16</li><li>2.站点信息 2020-3-15</li><li>3.站点信息 2020-3-14</li></ul></div>',
            //第二个tabs
            '<div style="display:none"><ul><li>1.监测中心 2020-3-16</li><li>2.监测中心 2020-3-15</li><li>3.监测中心 2020-3-14</li></ul></div>',
            //第三个tabs
            '<div style="display:none"><li>1.实时数据 2020-3-16</li><li>2.实时数据 2020-3-15</li><li>3.实时数据 2020-3-14</li></ul></div>',
            "</div>",
            '<div class="tabs-button"><button class="mybtn">查看更多任务</button></div>',
            "</div>"
          ].join(""),
          // 基点指向marker的头部位置（信息窗体的具体位置）
          offset: new AMap.Pixel(-10, -40)
        });

        //监听事件
        infoWindow.get$InfoBody().on("click", ".mybtn", function(event) {
          event.stopPropagation(); //阻止冒泡
          console.log("点击查看更多任务");
        });
        infoWindow.open(that.map, e.target.getPosition());
        //切换事件
        $("body").on("click", "#tabs li", function() {
          var index = $(this).index();
          var divs = $("#tabs-body > div");
          $(this)
            .siblings("li")
            .removeClass("active");
          $(this).addClass("active");
          divs.hide(); //隐藏所有选中项内容
          divs.eq(index).show(); //显示选中项对应内容
        });
      });
    },
    //搜索轨迹
    handleSubmit() {
      this.map.remove(this.pointMarkers);
      this.map.remove(this.markers);
      this.showPath();
    },
    //显示轨迹
    showPath() {
      var pathParam = [
        { x: 116.478928, y: 39.997761, sp: 19, ag: 0, tm: 1478031031 },
        { x: 116.478907, y: 39.998422, sp: 10, ag: 0, tm: 2 },
        { x: 116.479384, y: 39.998546, sp: 10, ag: 110, tm: 3 },
        { x: 116.481053, y: 39.998204, sp: 10, ag: 120, tm: 4 },
        { x: 116.481793, y: 39.997868, sp: 10, ag: 120, tm: 5 },
        { x: 116.482898, y: 39.998217, sp: 10, ag: 30, tm: 6 },
        { x: 116.483789, y: 39.999063, sp: 10, ag: 30, tm: 7 },
        { x: 116.484674, y: 39.999844, sp: 10, ag: 30, tm: 8 }
      ];

      var path1 = [];
      for (var i = 0; i < pathParam.length; i += 1) {
        path1.push([pathParam[i].x, pathParam[i].y]);
      }
      var oldLine = new AMap.Polyline({
        path: path1,
        strokeWeight: 8,
        strokeOpacity: 1,
        strokeColor: "#0091ea"
      });
      this.map.add(oldLine);
      this.map.setFitView();
    },
    //收缩
    changeVisible() {
      this.collapsed = !this.collapsed;
    },
    changeTabs(key) {
      if (key == 1) {
        this.$router.push({
          path: "/maintain/map"
        });
      }
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="less" scoped></style>
