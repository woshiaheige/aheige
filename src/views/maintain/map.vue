<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title">运维地图</span>
    <div class="map">
      <div class="info">
        搜索点数：<span id="mapView">{{
          markers.length + pointMarkers.length
        }}</span>
        显示站点数：<span id="massNumber">{{ pointMarkers.length }}</span>
      </div>
      <div id="container"></div>
    </div>
    <station-modal
      :show="modelShow"
      :model="model"
      @cancel="cancel"
    ></station-modal>
  </a-card>
</template>
<script>
import AMap from "AMap";
import Point from "@/assets/geojson/enterprise.json";
import Station from "@/assets/geojson/station.json";
import stationModal from "@/components/maintain/map/station";
export default {
  components: { stationModal },
  data() {
    return {
      map: null,
      markers: [],
      pointMarkers: [],
      colors: {},
      modelShow: false,
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
    //显示地标
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
        this.markers.push(marker);
      });

      this.map.add(this.markers);
    },
    //显示站点
    showStationPoint() {
      this.map.remove(this.pointMarkers);
      this.pointMarkers = [];
      Station.forEach(item => {
        let marker;
        let content =
          '<div class="marker-label">' + item.enterprise.length + "</div>";
        // 创建一个 Marker 实例：
        marker = new AMap.Marker({
          position: new AMap.LngLat(item.point[0], item.point[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item.name,
          content: content,
          anchor: "center"
        });

        marker.status = item.status;
        marker.on("click", e => {
          this.model.title = e.target.w.title;
          this.model.status = e.target.status;
          this.showInfo(marker, e);
          // this.modelShow = true;
        });

        this.pointMarkers.push(marker);
      });

      this.map.add(this.pointMarkers);
    },
    //自定义窗体
    showInfo(marker, e) {
      var title = e.target.w.title,
        content = [];
      content.push(
        "<div><p class='title'>任务信息</p><ul><li>1、" +
          e.target.w.title +
          "任务信息1</li><li>2、" +
          e.target.w.title +
          "任务信息2</li><li>3、" +
          e.target.w.title +
          "任务信息3</li></div>"
      );
      // content.push("<a-button>查看更多任务</a-button>");
      var infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: this.createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(0, -60)
      });
      infoWindow.open(this.map, e.target.getPosition());
    },

    //构建自定义信息窗体
    createInfoWindow(title, content) {
      var info = document.createElement("div");
      info.className = "content-window content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow();

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "-1px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },
    //关闭信息窗体
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
    cancel(value) {
      this.modelShow = value;
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
<style lang="less" scoped></style>
