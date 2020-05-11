<template>
  <a-modal
    v-model="modalInfo.show"
    title="地图"
    @cancel="cancel"
    width="60%"
    class="search-map"
  >
    <div id="myChart" :style="{ width: '100%', height: '450px' }"></div>
    <div class="info">
      <div class="input-item">
        <input id="tipinput" type="info" placeholder="关键字" />
      </div>
    </div>
    <div
      class="formlistbutton"
      style="height:64px;padding-top:10px;position:relative;"
      slot="footer"
    >
      <div style="position:absolute;bottom:-0;left:0; text-align:left">
        经度:{{ lnglat[0] }}<br />纬度:{{ lnglat[1] }}<br />地址:{{ address }}
      </div>
      <a-button @click="cancel()">取消</a-button>
      <a-button type="primary" @click="Submit()">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import $ from "jquery";
export default {
  props: ["obj"],
  data() {
    return {
      lnglat: [], //传递走的经纬度
      address: ""
    };
  },
  mounted() {},
  computed: {
    modalInfo: {
      get: function() {
        return this.obj;
      },
      set: function() {}
    }
  },
  watch: {
    "obj.show"() {
      if (this.obj.show == true) {
        if (this.obj.lnglat && this.obj.lnglat.length > 0) {
          this.handleInitMap();
        } else {
          this.$nextTick(function() {
            this.initMap();
          });
        }
      }
    }
  },
  methods: {
    handleInitMap() {
      this.lnglat = this.obj.lnglat;
      this.address = this.obj.address;
      this.$nextTick(function() {
        this.initMap(this.obj.lnglat, this.obj.address);
      });
    },
    // 创建点标记
    setPoint(map, lng, lat) {
      this.lnglat = [lng, lat];
      map.clearMap(); //清除地图上所有覆盖物
      let marker = new AMap.Marker({
        position: [lng, lat],
        icon:
          "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        iconSize: new AMap.Size(40, 50),
        offset: new AMap.Pixel(-20, -50),
        // 设置是否可拖拽
        draggable: true,
        cursor: "move"
      });
      marker.setMap(map);
      // 设置点标记的动画效果，此处为弹跳效果
      // marker.setAnimation("AMAP_ANIMATION_BOUNCE");
      map.setCenter([lng, lat]); //重新设置地图中心点
    },
    // 创建地图
    initMap(lnglat, address) {
      //lnglat:传进来的点的经纬度[113.538754,22.792099]，address:传进来的点的地址，不传则为空，没有点标记
      let _this = this;
      let point = [];
      let map = "";
      if (lnglat) {
        // 传入点时
        point = lnglat;
        _this.lnglat = lnglat;
        _this.address = address;
        map = new AMap.Map("myChart", {
          resizeEnable: true,
          zoom: 12,
          mapStyle: "amap://styles/87458463341edbb88bf74018802e9e18",
          center: point
        });
      } else {
        // 未传入点时，根据用户IP自动匹配地图中心点
        map = new AMap.Map("myChart", {
          resizeEnable: true,
          zoom: 12,
          mapStyle: "amap://styles/87458463341edbb88bf74018802e9e18"
        });
        _this.lnglat = {
          lng: map.getCenter().lng,
          lat: map.getCenter().lat
        };
        _this.address = "";
      }
      $("#tipinput").val("");
      //搜索功能，输入提示
      AMap.plugin("AMap.Autocomplete", function() {
        let auto = new AMap.Autocomplete({
          input: "tipinput"
        });
        AMap.event.addListener(auto, "select", function(e) {
          if (e && e.poi) {
            _this.setPoint(map, e.poi.location.lng, e.poi.location.lat);
            _this.address = e.poi.address;
          }
        });
      });
      //按下回车搜索
      $("#tipinput").bind("keypress", function(event) {
        if (event.keyCode == 13) {
          var keywords = document.getElementById("tipinput").value;
          AMap.plugin("AMap.Autocomplete", function() {
            var autoOptions = {
              city: "全国"
            };
            var autoComplete = new AMap.Autocomplete(autoOptions);
            autoComplete.search(keywords, function(status, result) {
              // 搜索成功时，result即是对应的匹配数据
              if (status == "complete") {
                let data = result.tips[0];
                _this.setPoint(map, data.location.lng, data.location.lat);
                _this.address = data.district;
                $(".amap-sug-result").css("visibility", "hidden");
              }
            });
          });
        }
      });

      // 创建点标记
      if (lnglat) {
        _this.setPoint(map, lnglat[0], lnglat[1]);
      }

      // 点击地图获取经纬度
      map.on("click", function(e) {
        console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
        map.clearMap(); //清除地图上所有覆盖物
        // 创建新点标记
        _this.setPoint(map, e.lnglat.getLng(), e.lnglat.getLat());
        _this.lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
        // 这里通过高德 SDK 完成。将经纬度转地址
        AMap.plugin("AMap.Geocoder", function() {
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([e.lnglat.getLng(), e.lnglat.getLat()], function(
            status,
            result
          ) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                _this.address = result.regeocode.formattedAddress;
                _this.$nextTick();
              }
            }
          });
        });
      });
    },

    Submit() {
      let data = {
        lnglat: this.lnglat,
        address: this.address
      };
      this.$emit("getModal", data);
      this.modalInfo.show = false;
    },
    cancel() {
      // this.$emit("getModal", { lnglat: [], address: "" });
      this.modalInfo.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.info {
  display: inline-block;
  position: absolute;
  top: 60px;
}
</style>
