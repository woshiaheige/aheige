<template>
  <a-card :bordered="false" class="maintain">
    <span slot="title"
      ><a-icon type="arrow-left" @click="$router.back(-1)" />行驶路径</span
    >
    <div class="map">
      <div id="container"></div>
    </div>
  </a-card>
</template>
<script>
import AMap from "AMap";
export default {
  components: {},
  data() {
    return {
      map: null,
      vehicleId: "",
      lineArr: ""
    };
  },
  methods: {
    initData() {
      let params = {
        vehicleId: this.vehicleId
      };
      this.$api.car.trajectory(params).then(res => {
        this.lineArr = res.data.data.arr;
        this.initMap();
      });
    },
    initMap() {
      this.map = new AMap.Map("container", {
        center: [113.53, 23.36],
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 8,
        // zoomEnable: false, //地图是否可缩放
        doubleClickZoom: false // 地图是否可通过双击鼠标放大地图
      });

      this.setCar();
      this.setPolyLine();
      this.map.setFitView();
    },

    setCar() {
      //设置车辆起点
      this.marker = new AMap.Marker({
        map: this.map,
        position: this.lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });
    },
    setPolyLine() {
      // 绘制轨迹
      this.polyline = new AMap.Polyline({
        map: this.map,
        path: this.lineArr,
        showDir: true,
        strokeColor: "blue", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 //线宽
        // strokeStyle: "solid"  //线样式
      });
    }
  },
  mounted() {
    this.vehicleId = this.$route.query.vehicleId;
    this.initData();
  }
};
</script>
<style lang="less" scoped></style>
